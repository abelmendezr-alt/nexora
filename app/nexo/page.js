"use client";

import { useEffect, useState, useRef } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [destacada, setDestacada] = useState(null);

  const [posicion, setPosicion] = useState({ x: 0, y: 0 });
  const [escala, setEscala] = useState(1);

  const [viajando, setViajando] = useState(false);
  const [regresandoOrigen, setRegresandoOrigen] = useState(false);

  const [conexiones, setConexiones] = useState([]);
  const [siguiendo, setSiguiendo] = useState([]);

  const tocando = useRef(false);
  const moviendo = useRef(false);

  const inicio = useRef({ x: 0, y: 0 });
  const posicionInicial = useRef({ x: 0, y: 0 });

  const distanciaInicial = useRef(null);
  const escalaInicial = useRef(1);

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos() {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    const nexosGuardados = JSON.parse(
      localStorage.getItem("nexora_nexos") || "[]"
    );

    const siguiendoGuardado = JSON.parse(
      localStorage.getItem("nexora_siguiendo") || "[]"
    );

    setPublicaciones(guardadas);
    setConexiones(nexosGuardados);
    setSiguiendo(siguiendoGuardado);

    if (guardadas.length > 0) {
      seleccionarMayor(guardadas);
    }
  }

  function seleccionarMayor(lista) {
    const mayor = [...lista].sort((a, b) => {
      const totalA = Object.values(a.reacciones || {}).reduce(
        (suma, cantidad) => suma + cantidad,
        0
      );

      const totalB = Object.values(b.reacciones || {}).reduce(
        (suma, cantidad) => suma + cantidad,
        0
      );

      return totalB - totalA;
    })[0];

    setDestacada(mayor);
  }

  function volverAlOrigen() {
    setRegresandoOrigen(true);
    setDestacada(null);

    setPosicion({ x: 0, y: 0 });
    setEscala(1);

    setTimeout(() => {
      setRegresandoOrigen(false);
    }, 1000);
  }

  function cargarCosmoDePrueba() {
    const pensamientos = [
      {
        nombre: "Luna",
        texto: "A veces solo necesitamos detenernos.",
        reacciones: { "♡": 18, "✦": 4, "◉": 2, "∞": 1 },
      },
      {
        nombre: "Mateo",
        texto: "Hoy quiero descubrir algo nuevo.",
        reacciones: { "♡": 3, "✦": 16, "◉": 5, "∞": 2 },
      },
      {
        nombre: "Sofía",
        texto: "La música cambia completamente el día.",
        reacciones: { "♡": 11, "✦": 7, "◉": 8, "∞": 4 },
      },
      {
        nombre: "Diego",
        texto: "Todo parece conectado cuando observas suficiente.",
        reacciones: { "♡": 25, "✦": 12, "◉": 9, "∞": 8 },
      },
      {
        nombre: "Valeria",
        texto: "Quiero conocer lugares que nunca he visto.",
        reacciones: { "♡": 6, "✦": 3, "◉": 14, "∞": 5 },
      },
      {
        nombre: "Leo",
        texto: "Hay días que simplemente se sienten diferentes.",
        reacciones: { "♡": 8, "✦": 10, "◉": 4, "∞": 15 },
      },
      {
        nombre: "Nora",
        texto: "¿Y si estamos más conectados de lo que creemos?",
        reacciones: { "♡": 31, "✦": 18, "◉": 12, "∞": 20 },
      },
      {
        nombre: "Alex",
        texto: "La ciudad también tiene estados de ánimo.",
        reacciones: { "♡": 9, "✦": 5, "◉": 18, "∞": 7 },
      },
      {
        nombre: "Emma",
        texto: "Hoy el cielo se siente extraño.",
        reacciones: { "♡": 14, "✦": 22, "◉": 6, "∞": 3 },
      },
      {
        nombre: "Gael",
        texto: "No sé qué estoy buscando, pero quiero encontrarlo.",
        reacciones: { "♡": 19, "✦": 6, "◉": 15, "∞": 11 },
      },
      {
        nombre: "Mía",
        texto: "Una pequeña idea puede cambiar muchas cosas.",
        reacciones: { "♡": 5, "✦": 27, "◉": 9, "∞": 13 },
      },
      {
        nombre: "Ángel",
        texto: "Quizá conectar sea la forma más simple de entender.",
        reacciones: { "♡":
