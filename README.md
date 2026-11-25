<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg" />
  <img alt="Kevin Carrasco · Desarrollador de software · IoT · Full stack" src="assets/banner-dark.svg" width="100%" />
</picture>

<p align="center">
  <a href="https://www.linkedin.com/in/kevin-carrasco-360b8b451"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Kevin_Carrasco-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:carrascokevin756@gmail.com"><img alt="Correo" src="https://img.shields.io/badge/Correo-carrascokevin756%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" /></a>
  <img alt="Abierto a oportunidades" src="https://img.shields.io/badge/Abierto_a-oportunidades-22C55E?style=for-the-badge" />
</p>

## Hola, soy Kevin

Construyo sistemas **de punta a punta**: desde el firmware que lee un sensor en un ESP32 hasta la plataforma web
que muestra esos datos, desplegada con Docker. Me gusta que lo que hago se pueda **levantar con un solo comando,
probar y entender**: cada proyecto trae su `docker compose`, sus diagramas y sus pruebas.

- 🔌 **IoT y embebidos** — firmware en C++ para ESP32 y Arduino, FreeRTOS, Bluetooth LE, MQTT, UDP y portales cautivos.
- 🧩 **Full stack** — APIs con Spring Boot, Express, Fastify y ASP.NET Core; interfaces con React, Angular y Next.js.
- 🔐 **Seguridad y datos** — cifrado en capas, JWT, PostgreSQL, MongoDB, SQL Server y despliegue con Docker, nginx y Traefik.

## Del pin GPIO al contenedor

Así se conectan las capas en las que trabajo, con un proyecto real en cada una:

```mermaid
flowchart LR
    H["⚙️ <b>Hardware</b><br/>ESP32 · Arduino · FreeRTOS<br/><i>Carro FPV · ESP32-Control</i>"]
    P["📡 <b>Protocolos</b><br/>BLE · MQTT · UDP · WebSocket<br/><i>Piloto · Riego IoT</i>"]
    B["🧠 <b>Backend</b><br/>Spring · Express · Fastify · .NET<br/><i>CipherChat · TechStore 360</i>"]
    F["🖥️ <b>Interfaces</b><br/>React · Angular · Next.js · Android<br/><i>Pliego · FinanEcuador</i>"]
    D["🐳 <b>Despliegue</b><br/>Docker · nginx · Dokploy<br/><i>EncomiTrack</i>"]
    H --> P --> B --> F --> D
```

## Proyectos

<!-- PROYECTOS:INICIO -->
<table>
<tr><td width="50%" valign="top"><a href="https://github.com/Jostero32/Piloto"><img src="https://raw.githubusercontent.com/Jostero32/Piloto/main/docs/img/inicio.png" alt="Piloto" width="420" /></a><br/><b><a href="https://github.com/Jostero32/Piloto">Piloto</a></b><br/>Librería Arduino, protocolo y app Android para controlar robots por Bluetooth: el robot declara sus sensores, salidas y conductas al conectarse, y la app arma su interfaz a partir de esa descripción.<br/><code>Android</code> <code>Java</code> <code>Arduino</code> <code>C++</code> <code>ESP32</code> <code>Bluetooth LE</code><br/><sub>Software verificado; ensayo físico en curso · 2026</sub></td><td width="50%" valign="top"><a href="https://github.com/Jostero32/ProyectoSeguridad"><img src="https://raw.githubusercontent.com/Jostero32/ProyectoSeguridad/main/docs/img/chat.png" alt="CipherChat" width="420" /></a><br/><b><a href="https://github.com/Jostero32/ProyectoSeguridad">CipherChat</a></b><br/>Mensajería en tiempo real al estilo WhatsApp con cifrado simétrico configurable en tres capas: datos en reposo, API REST y WebSocket (AES-GCM, DES-CBC, ChaCha20).<br/><code>Angular</code> <code>Spring Boot</code> <code>Java 21</code> <code>PostgreSQL</code> <code>MinIO</code> <code>WebSocket</code><br/><sub>Funcional · 2026</sub></td></tr>
<tr><td width="50%" valign="top"><a href="https://github.com/Jostero32/Proyecto-Latex-Web"><img src="https://raw.githubusercontent.com/Jostero32/Proyecto-Latex-Web/main/docs/img/editor.png" alt="Pliego · editor LaTeX colaborativo" width="420" /></a><br/><b><a href="https://github.com/Jostero32/Proyecto-Latex-Web">Pliego · editor LaTeX colaborativo</a></b><br/>Editor LaTeX web al estilo de Overleaf: proyectos con imágenes, compilación a PDF en contenedores aislados, colaboración en tiempo real con cursores y SyncTeX en ambos sentidos.<br/><code>TypeScript</code> <code>React</code> <code>Vite</code> <code>Fastify</code> <code>Yjs</code> <code>Hocuspocus</code><br/><sub>En desarrollo activo · 2026</sub></td><td width="50%" valign="top"><a href="https://github.com/Jostero32/EncomiTrack"><img src="https://raw.githubusercontent.com/Jostero32/EncomiTrack/main/docs/img/01-inicio.png" alt="EncomiTrack" width="420" /></a><br/><b><a href="https://github.com/Jostero32/EncomiTrack">EncomiTrack</a></b><br/>Proyecto integrador de un emprendimiento de encomiendas: portal del semestre, roles de pago con parámetros legales por vigencia y paz y salvo con liquidación laboral, desplegados juntos con un solo docker compose.<br/><code>Next.js</code> <code>Angular</code> <code>Express</code> <code>TypeORM</code> <code>SQLite</code> <code>Docker</code><br/><sub>Desplegado · 2026</sub></td></tr>
<tr><td width="50%" valign="top"><a href="https://github.com/Jostero32/economia-amortizacion"><img src="https://raw.githubusercontent.com/Jostero32/economia-amortizacion/main/docs/img/simulador-credito.png" alt="FinanEcuador" width="420" /></a><br/><b><a href="https://github.com/Jostero32/economia-amortizacion">FinanEcuador</a></b><br/>Simulador financiero para Ecuador: créditos con amortización francesa y alemana, inversiones a plazo fijo y ahorro programado con tasas del BCE, solicitudes con flujo de asesor y verificación de identidad (eKYC) con lectura de MRZ y comparación facial.<br/><code>React</code> <code>Vite</code> <code>Tailwind</code> <code>Express</code> <code>Sequelize</code> <code>PostgreSQL</code><br/><sub>Desplegado (proyecto académico) · 2026</sub></td><td width="50%" valign="top"><a href="https://github.com/Jostero32/Carro-Fpv-Wifi-Esp32"><img src="https://raw.githubusercontent.com/Jostero32/Carro-Fpv-Wifi-Esp32/main/docs/img/app-manejo.png" alt="Carro FPV Wi-Fi con ESP32" width="420" /></a><br/><b><a href="https://github.com/Jostero32/Carro-Fpv-Wifi-Esp32">Carro FPV Wi-Fi con ESP32</a></b><br/>Carro RC en primera persona controlado desde la PC con volante o control: comandos UDP a 50 Hz con failsafe, video MJPEG desde una ESP32-CAM y app de escritorio con telemetría y calibración.<br/><code>ESP32</code> <code>ESP32-CAM</code> <code>C++</code> <code>Arduino</code> <code>Python</code> <code>pywebview</code><br/><sub>Funcional · 2026</sub></td></tr>
<tr><td width="50%" valign="top"><a href="https://github.com/Jostero32/Sistema-Riego-IoT"><img src="https://raw.githubusercontent.com/Jostero32/Sistema-Riego-IoT/main/docs/esquema-conexiones.svg" alt="Sistema de riego IoT" width="420" /></a><br/><b><a href="https://github.com/Jostero32/Sistema-Riego-IoT">Sistema de riego IoT</a></b><br/>Monitoreo de un sistema de riego: Arduino Mega que envía tramas por serie, gateway ESP32 que publica por MQTT, y backend Spring Boot con MongoDB, API REST y WebSocket en tiempo real.<br/><code>ESP32</code> <code>Arduino</code> <code>MQTT</code> <code>Mosquitto</code> <code>Spring Boot</code> <code>MongoDB</code><br/><sub>Backend probado de extremo a extremo; firmware compila · 2026</sub></td><td width="50%" valign="top"><a href="https://github.com/Jostero32/ESP32-Control"><img src="https://raw.githubusercontent.com/Jostero32/ESP32-Control/main/docs/esquema-conexiones.svg" alt="ESP32-Control" width="420" /></a><br/><b><a href="https://github.com/Jostero32/ESP32-Control">ESP32-Control</a></b><br/>Firmware para ESP32 con cuatro botones que envían peticiones HTTP(S) a una API configurable, con portal cautivo para el Wi-Fi y panel de administración protegido, todo embebido en un único binario.<br/><code>ESP32</code> <code>C++</code> <code>Arduino</code> <code>FreeRTOS</code> <code>HTML/JS</code><br/><sub>Compila sin advertencias; pendiente de prueba en placa · 2026</sub></td></tr>
</table>

<details>
<summary><b>Más proyectos (3)</b></summary>
<br/>

<table>
<tr><td width="50%" valign="top"><b><a href="https://github.com/Jostero32/TechStore360">TechStore 360</a></b><br/>API REST desplegada en dos instancias detrás de un balanceador nginx con alta disponibilidad (keepalived), conmutación de base de datos, autenticación con Firebase y facturación por SOAP.<br/><code>Python</code> <code>Flask</code> <code>nginx</code> <code>Keepalived</code> <code>PostgreSQL</code> <code>Firebase</code><br/><sub>Desplegado (proyecto académico) · 2026</sub></td><td width="50%" valign="top"><a href="https://github.com/Jostero32/RestauranteDomotico"><img src="https://raw.githubusercontent.com/Jostero32/RestauranteDomotico/main/docs/esquema-conexiones.svg" alt="Restaurante domótico" width="420" /></a><br/><b><a href="https://github.com/Jostero32/RestauranteDomotico">Restaurante domótico</a></b><br/>Maqueta de restaurante automatizado: Arduino Mega con mesas, puerta, garaje y sensores, y un ESP32 que crea la red del local con pedidos en tiempo real por WebSocket.<br/><code>Arduino Mega</code> <code>ESP32</code> <code>C++</code> <code>WebSocket</code> <code>JSON</code> <code>MyOpenLab</code><br/><sub>Prototipo funcional (maqueta) · 2025</sub></td></tr>
<tr><td width="50%" valign="top"><a href="https://github.com/Jostero32/Guitarra_CloneHero_Inalambrico_esp32"><img src="https://raw.githubusercontent.com/Jostero32/Guitarra_CloneHero_Inalambrico_esp32/main/docs/esquema-conexiones.svg" alt="Guitarra inalámbrica para Clone Hero" width="420" /></a><br/><b><a href="https://github.com/Jostero32/Guitarra_CloneHero_Inalambrico_esp32">Guitarra inalámbrica para Clone Hero</a></b><br/>Control de guitarra para Clone Hero con ESP32 que se anuncia por Bluetooth LE como gamepad estándar de 9 botones, sin drivers.<br/><code>ESP32</code> <code>C++</code> <code>Arduino</code> <code>Bluetooth LE</code> <code>HID</code><br/><sub>Funcional; correcciones de 2026 pendientes de probar en placa · 2024</sub></td><td width="50%"></td></tr>
</table>

</details>

<sub>Sección generada automáticamente a partir del <code>portfolio.json</code> de cada repositorio · 11 proyectos.</sub>
<!-- PROYECTOS:FIN -->

## Tecnologías

| Área | Herramientas |
|---|---|
| **Embebidos** | <img src="https://skillicons.dev/icons?i=cpp,arduino" height="36" alt="C++, Arduino" /> &nbsp; ![ESP32](https://img.shields.io/badge/ESP32-E7352C?style=flat-square&logo=espressif&logoColor=white) ![FreeRTOS](https://img.shields.io/badge/FreeRTOS-4A9A3A?style=flat-square) ![MQTT](https://img.shields.io/badge/MQTT-660066?style=flat-square&logo=mqtt&logoColor=white) ![Bluetooth LE](https://img.shields.io/badge/Bluetooth_LE-0082FC?style=flat-square&logo=bluetooth&logoColor=white) |
| **Lenguajes** | <img src="https://skillicons.dev/icons?i=java,python,js,ts,cs" height="36" alt="Java, Python, JavaScript, TypeScript, C#" /> |
| **Backend** | <img src="https://skillicons.dev/icons?i=spring,nodejs,express,dotnet,flask" height="36" alt="Spring, Node.js, Express, .NET, Flask" /> &nbsp; ![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white) ![Odoo](https://img.shields.io/badge/Odoo-714B67?style=flat-square&logo=odoo&logoColor=white) |
| **Frontend y móvil** | <img src="https://skillicons.dev/icons?i=react,angular,nextjs,vite,tailwind,androidstudio" height="36" alt="React, Angular, Next.js, Vite, Tailwind, Android" /> |
| **Datos** | <img src="https://skillicons.dev/icons?i=postgres,mysql,mongodb,redis,sqlite" height="36" alt="PostgreSQL, MySQL, MongoDB, Redis, SQLite" /> &nbsp; ![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white) ![MinIO](https://img.shields.io/badge/MinIO-C72E49?style=flat-square&logo=minio&logoColor=white) |
| **DevOps** | <img src="https://skillicons.dev/icons?i=docker,nginx,linux,githubactions,git" height="36" alt="Docker, nginx, Linux, GitHub Actions, Git" /> &nbsp; ![Dokploy](https://img.shields.io/badge/Dokploy-111827?style=flat-square) ![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=flat-square&logo=traefikproxy&logoColor=white) |

## Cómo trabajo

- **Todo levanta con Docker.** Cada servicio se encuentra por el nombre de su contenedor y las credenciales viven en
  un `.env` que no se versiona; el repositorio solo trae `.env.example`.
- **Documentación que se ve.** Diagramas de arquitectura en Mermaid, esquemas de conexiones en SVG y capturas
  generadas automáticamente desde la aplicación real.
- **Pruebas antes de publicar.** Por ejemplo, Piloto suma 176 pruebas de la app y 350 comprobaciones del protocolo;
  el firmware de los proyectos ESP32 compila sin advertencias.

<sub>🤖 Este perfil se actualiza solo: una <a href=".github/workflows/proyectos.yml">GitHub Action</a> lee el
<code>portfolio.json</code> de cada repositorio con la etiqueta <code>portfolio</code> y regenera la sección de
proyectos todos los días.</sub>
