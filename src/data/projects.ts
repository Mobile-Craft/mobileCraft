// src/data/projects.ts
import ReactNative from "../icons/ReactNative.astro";
import Firebase from "../icons/Firebase.astro";
import Flutter from "../icons/Flutter.astro";
import JavaScript from "../icons/JavaScript.astro";
import Dart from "../icons/Dart.astro";
import TypeScript from "../icons/TypeScript.astro";
import Expo from "../icons/Expo.astro";

const TAGS = {
    REACT_NATIVE: { name: "React Native", class: "bg-cyan-800/40 text-white", icon: ReactNative },
    FLUTTER: { name: "Flutter", class: "bg-cyan-600 text-white", icon: Flutter },
    FIREBASE: { name: "Firebase", class: "bg-white text-gray-800", icon: Firebase },
    JS: { name: "JavaScript", class: "bg-neutral-500/80 text-white", icon: JavaScript },
    TYPESCRIPT: { name: "TypeScript", class: "bg-cyan-900/50 text-white", icon: TypeScript },
    DART: { name: "DART", class: "bg-blue-600 text-white", icon: Dart },
    EXPO: { name: "Expo", class: "bg-slate-700/90 text-white", icon: Expo },
};

export const PROJECTS = [
    {
        title: "APORDOM - App  Autoridad Portuaria Dominicana",
        description:
            "Esta aplicación es una herramienta indispensable para agilizar los tramites portuarios, conocer los puertos, su ubicación y mantenerte informado de las ultimas noticias de los puertos de Republica Dominicana",
        ios: "https://apps.apple.com/do/app/autoridad-portuaria-dominicana/id6479921366?l=en-GB",
        android:
            "https://play.google.com/store/apps/details?id=com.solvex.apordom&pcampaignid=web_share",
        image: "/projects/apordom/apordom.webp",
        slug: "apordom",
        tags: [TAGS.REACT_NATIVE, TAGS.EXPO, TAGS.TYPESCRIPT],
    },
    {
        title: "Mi Siembra - App para administar tu fondo de pensiones",
        description:
            "Esta aplicación te brinda la facilidad de consultar, desde cualquier lugar, el balance de tu Cuenta de Pensión, invertir en tu fondo de pensión, canjear ofertas de aliados segun tu ubicación, tambien cuenta con el servicios de notificación de balance y aportes y otros servicios más.",
        ios: "https://apps.apple.com/do/app/mi-siembra/id1495099098?l=en-GB",
        android:
            "https://play.google.com/store/apps/details?id=com.appmovil.siembra&pcampaignid=web_share",
        image: "/projects/siembra/siembra.webp",
        slug: "mi-siembra",
        tags: [TAGS.REACT_NATIVE, TAGS.TYPESCRIPT, TAGS.FIREBASE],
    },

    {
        title: "App Humano",
        description:
            "Esta aplicación te permite acceder a los servicios de Humano para Realizar consultas medicas de forma virtual, pagar polizas de seguros y solicitar medicamentos en tu ubicación y solicitar autorizacion de procedimientos medicos",
        ios: "https://apps.apple.com/do/app/humano/id905470413?l=en-GB",
        android:
            "https://play.google.com/store/apps/details?id=com.arshumano.app.android&pcampaignid=web_share",
        image: "/projects/humano/humano.webp",
        slug: "app-humano",
        tags: [TAGS.REACT_NATIVE, TAGS.JS],
    },
    {
        title: "Proximamente",
        description:
            "Esta aplicacion estara publicada proximamente y sera algo muy JEVI Literalmente",
        ios: "",
        android: "",
        image: "glitch",
        slug: "proximamente",
        tags: [TAGS.REACT_NATIVE, TAGS.EXPO],
    },
];
