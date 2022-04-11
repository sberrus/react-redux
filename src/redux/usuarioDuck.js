import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

//constants
const dataInicial = {
	loading: false,
	activo: false,
};

// types
const LOADING = "LOADING";
const USUARIO_ERROR = "USUARIO_ERROR";
const USUARIO_EXITO = "USUARIO_EXITO";
const CERRAR_SESION_EXITO = "CERRAR_SESION_EXITO";
const ACTUALIZAR_NOMBRE_USUARIO_EXITO = "ACTUALIZAR_NOMBRE_USUARIO_EXITO";
const ACTUALIZAR_FOTO_PERFIL_EXITO = "ACTUALIZAR_FOTO_PERFIL_EXITO";

// reducer
export default function usuarioReducer(state = dataInicial, action) {
	switch (action.type) {
		//
		case LOADING:
			return { ...state, loading: true };
		case USUARIO_ERROR:
			//Indicamos que el state va a ser de nuevo la data inicial que tiene ambos campos en false.
			return { ...dataInicial };
		case USUARIO_EXITO:
			return { ...state, loading: false, activo: true, user: action.payload };
		case CERRAR_SESION_EXITO:
			return { ...dataInicial };
		case ACTUALIZAR_NOMBRE_USUARIO_EXITO:
			return { ...state, user: action.payload, loading: false };
		case ACTUALIZAR_FOTO_PERFIL_EXITO:
			return { ...state, user: action.payload, loading: false };
		default:
			return { ...state };
	}
}

// actions
export const ingresoUsuarioAccion = () => async (dispatch) => {
	// Al ejecutarse esta acción inicializamos el estado de "loading" de este pato.
	dispatch({
		type: LOADING,
	});
	try {
		//Init auth provider
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		const res = await signInWithPopup(auth, provider);

		const usuario = {
			uid: res.user.uid,
			email: res.user.email,
			displayName: res.user.displayName,
			photoUrl: res.user.photoURL,
		};

		//Init firestore provider
		const db = getFirestore();

		const docRef = doc(db, "usuarios", usuario.email);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			dispatch({
				type: USUARIO_EXITO,
				payload: docSnap.data(),
			});

			//Data to store
			const data = JSON.stringify(docSnap.data());
			localStorage.setItem("usuario", data);
		} else {
			const usuariosRef = collection(db, "usuarios");
			await setDoc(doc(usuariosRef, usuario.email), usuario);
			dispatch({
				type: USUARIO_EXITO,
				payload: usuario,
			});
			localStorage.setItem("usuario", JSON.stringify(usuario));
		}
	} catch (error) {
		console.log(error);
		dispatch({ type: USUARIO_ERROR });
	}
};

export const leerUsuarioActivoAccion = () => async (dispatch) => {
	if (localStorage.getItem("usuario")) {
		dispatch({ type: USUARIO_EXITO, payload: JSON.parse(localStorage.getItem("usuario")) });
	}
};

export const cerrarSesionAccion = () => async (dispatch) => {
	const auth = getAuth();

	await signOut(auth);
	localStorage.removeItem("usuario");

	dispatch({ type: CERRAR_SESION_EXITO });
};

export const cambiarNombreUsuario = (newName) => async (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});
	try {
		const db = getFirestore();
		const user = getState().usuario.user;

		const usuarioRef = doc(db, "usuarios", user.email);

		await updateDoc(usuarioRef, {
			displayName: newName,
		});

		const updatedUser = {
			...user,
			displayName: newName,
		};

		dispatch({ type: ACTUALIZAR_NOMBRE_USUARIO_EXITO, payload: updatedUser });
		localStorage.setItem("usuario", JSON.stringify(updatedUser));
	} catch (error) {
		console.log(error);
	}
};
export const editarFotoPerfil = (image) => async (dispatch, getState) => {
	dispatch({
		type: LOADING,
	});

	//Actual User
	const user = getState().usuario.user;

	//Firebase Storage
	const storage = getStorage();
	const storageRef = ref(storage, `profilePictures/${user.uid}`);
	//Firebase Firestore
	const db = getFirestore();
	const usuarioRef = doc(db, "usuarios", user.email);

	try {
		uploadBytes(storageRef, image).then((snapshot) => {
			getDownloadURL(ref(storage, `profilePictures/${user.uid}`)).then((url) => {
				updateDoc(usuarioRef, {
					photoUrl: url,
				});

				const updatedUser = { ...user, photoUrl: url };
				dispatch({
					type: "ACTUALIZAR_FOTO_PERFIL_EXITO",
					payload: { ...user, photoUrl: url },
				});
				localStorage.setItem("usuario", JSON.stringify(updatedUser));
			});
		});
	} catch (error) {
		console.log(error);
	}
};
