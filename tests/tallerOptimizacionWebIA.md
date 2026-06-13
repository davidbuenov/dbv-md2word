# Taller de Optimización Web para Agentes de IA (Agent Readiness)

Este documento es una guía exhaustiva y paso a paso para optimizar la compatibilidad de cualquier sitio web con agentes de IA autónomos, asistentes de desarrollo (como Cursor, Claude Code, Windsurf) y buscadores conversacionales o semánticos. 

**Creado por David Bueno Vallejo en colaboración con su asistente de inteligencia artificial Antigravity, basándose en la experiencia real de optimización e integración desarrollada para `davidbuenov.com`.**

---

## Índice del Taller

1. [1. Introducción al Taller: ¿Qué es el "Agent Readiness"?](#1-introducción-al-taller-qué-es-el-agent-readiness)
2. [2. Evaluadores y Herramientas de Benchmark](#2-evaluadores-y-herramientas-de-benchmark)
3. [3. Paso a Paso de Optimización y Estructura de Ficheros](#3-paso-a-paso-de-optimización-y-estructura-de-ficheros)
   - [Paso 1: Configuración de Crawling y Content Signals](#paso-1-configuración-de-crawling-y-content-signals)
   - [Paso 2: Mapa Semántico y Autodescubrimiento Básico (`llms.txt` y `auth.md`)](#paso-2-mapa-semántico-y-autodescubrimiento-básico-llmstxt-y-authmd)
   - [Paso 3: Descubrimiento de APIs y Seguridad (`.well-known/`)](#paso-3-descubrimiento-de-apis-y-seguridad-well-known)
   - [Paso 4: Protocolos de Agentes Emergentes (`agent.json` y `mcp.json`)](#paso-4-protocolos-de-agentes-emergentes-agentjson-y-mcpjson)
   - [Paso 5: Ecosistema de Habilidades del Agente (`agent-skills/`)](#paso-5-ecosistema-de-habilidades-del-agente-agent-skills)
   - [Paso 6: Integración del Model Context Protocol (MCP)](#paso-6-integración-del-model-context-protocol-mcp)
   - [Paso 7: Negociación de Contenido Markdown (Markdown Negotiation)](#paso-7-negociación-de-contenido-markdown-markdown-negotiation)
   - [Paso 8: SEO Semántico y Grafo de Entidades (Schema.org JSON-LD)](#paso-8-seo-semántico-y-grafo-de-entidades-schemaorg-json-ld)
   - [Paso 9: Configuración DNS para Descubrimiento de IA (DNS-AID)](#paso-9-configuración-dns-para-descubrimiento-de-ia-dns-aid)
4. [4. Infraestructura de Despliegue e Inyección de Cabeceras (Firebase)](#4-infraestructura-de-despliegue-e-inyección-de-cabeceras-firebase)
5. [5. Configuración de Puentes Locales y Clientes](#5-configuración-de-puentes-locales-y-clientes)
6. [6. Referencias y Especificaciones Oficiales](#6-referencias-y-especificaciones-oficiales)

---

## 1. Introducción al Taller: ¿Qué es el "Agent Readiness"?

El **Agent Readiness** (o preparación para agentes) es el conjunto de prácticas de desarrollo y arquitectura web orientadas a facilitar que los sistemas de inteligencia artificial (modelos LLM, rastreadores web inteligentes, extensiones de navegador semánticas y agentes autónomos) puedan descubrir, comprender, navegar y consumir el contenido y los servicios de un sitio web de manera eficiente y autónoma.

### ⚠️ Estándares Consolidados vs. Propuestas Emergentes

Es fundamental comprender que en este taller trabajaremos con dos tipos de especificaciones:
1. **Estándares Consolidados:** Normativas oficiales publicadas y adoptadas de manera universal en la web (como el protocolo `robots.txt` regulado por la RFC 9309 o las cabeceras HTTP `Link` de la RFC 8288).
2. **Propuestas y Borradores Emergentes:** Especificaciones en fase de borrador (IETF drafts, propuestas de Cloudflare, WorkOS o Anthropic) que aún no son estándares oficiales, pero que están ganando una adopción masiva y son evaluadas por los principales validadores (como el Model Context Protocol (MCP), las Agent Cards, los índices de Agent Skills, o DNS-AID). Incorporar estas propuestas prepara a la web para el futuro inmediato del ecosistema de agentes.

---

## 2. Evaluadores y Herramientas de Benchmark

Para evaluar la preparación del sitio web se utilizan cuatro herramientas de diagnóstico clave. Cada una se enfoca en diferentes facetas del descubrimiento y consumo por parte de la IA:

| Herramienta / Validador | URL de Referencia | Aspectos Clave Auditados |
| :--- | :--- | :--- |
| **IsItAgentReady** | [isitagentready.com](https://isitagentready.com) | Evalúa la negociación dinámica de Markdown (`Accept: text/markdown`), discovery mediante cabeceras `Link`, DNS-AID, integración de WebMCP y metadatos de OAuth/Auth.md. |
| **AgentReady** | [agentready.md](https://agentready.md) | Evalúa la presencia de Agent Cards (`agent.json`), MCP Server Cards (`mcp.json`), así como la semántica de la estructura HTML y la correcta jerarquía de encabezados (`<h1>` a `<h6>`). |
| **SiteSpeak AI Readiness Scanner** | [sitespeak.ai/tools/ai-agent-readiness-scanner](https://sitespeak.ai/tools/ai-agent-readiness-scanner) | Se enfoca en el soporte del Model Context Protocol (MCP), descubrimiento de endpoints y formato/estructura del archivo `llms.txt`. |
| **Luminary Lane A2A Checker** | [luminarylane.app/tools/a2a-readiness-checker/](https://www.luminarylane.app/tools/a2a-readiness-checker/) | Evalúa el cumplimiento y completitud del estándar Agent Card, las directivas explícitas para agentes en `robots.txt` y la documentación semántica general. |

---

## 3. Paso a Paso de Optimización y Estructura de Ficheros

A continuación, se detalla cómo implementar cada uno de los mecanismos que configuran una web optimizada para agentes de IA.

---

### Paso 1: Configuración de Crawling y Content Signals

Controla cómo interactúan los bots de IA tradicionales con el contenido y declara de forma declarativa las preferencias de entrenamiento de datos.

*   **Diagnóstico de IsItAgentReady:**
    *   *Issue:* Faltan reglas de exclusión explícitas o se carece de especificaciones sobre el uso de contenidos.
    *   *Recomendación:* Publicar un `robots.txt` válido y agregar las cabeceras de preferencias semánticas.
*   **Especificaciones de Referencia:**
    *   [RFC 9309 - Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309)
    *   [Content Signals Draft Specification](https://contentsignals.org/) / [IETF Draft romm-aipref-contentsignals](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/)
*   **Prompt de IA Sugerido (para Cursor/Claude):**
    ```text
    Revisa mi archivo robots.txt o crea uno nuevo en la raíz del proyecto. Asegúrate de que cumpla con el estándar RFC 9309. Añade una directiva 'Content-Signal' que permita la búsqueda e inserción contextual (search=yes, ai-input=yes) pero deniegue explícitamente el entrenamiento libre de modelos de IA (ai-train=no). Incluye también la ruta absoluta al sitemap del sitio.
    ```
*   **Estructura y Código de Ejemplo:**
    Crear o modificar [`robots.txt`](file:///d:/Programacion/github-davidbuenov/web/robots.txt) en la raíz:
    ```text
    User-agent: *
    Allow: /
    Content-Signal: ai-train=no, search=yes, ai-input=yes

    Sitemap: https://tusitio.com/sitemap.xml
    ```

---

### Paso 2: Mapa Semántico y Autodescubrimiento Básico (`llms.txt` y `auth.md`)

Proporciona un mapa de contenidos legible en Markdown y describe las políticas de acceso de agentes al sitio.

*   **Diagnóstico de IsItAgentReady / SiteSpeak:**
    *   *Issue:* El agente de IA se pierde intentando rastrear el mapa de navegación o encuentra páginas 404 en HTML al auditar flujos de registro.
    *   *Recomendación:* Crear `/llms.txt` para la navegación y `/auth.md` con las instrucciones de registro del agente.
*   **Especificaciones de Referencia:**
    *   [llms.txt - Proposed Standard](https://llmstxt.org/)
    *   [WorkOS Auth.md Specification](https://workos.com/auth-md) / [GitHub workos/auth.md](https://github.com/workos/auth.md)
*   **Prompt de IA Sugerido:**
    ```text
    Genera un archivo 'llms.txt' en la raíz con la descripción corta del sitio, y una lista organizada de enlaces a las APIs y las páginas de navegación clave (Blog, Proyectos, Experiencia, etc.). Además, genera un archivo 'auth.md' en la raíz. Este archivo debe tener exactamente '# auth.md' como su encabezado principal H1 y detallar que el sitio es de acceso público y libre de llaves (anonymous flow).
    ```
*   **Estructura de Ejemplo para `llms.txt`:**
    Crear [`llms.txt`](file:///d:/Programacion/github-davidbuenov/web/llms.txt) en la raíz:
    ```markdown
    # Nombre del Propietario - Personal Website
    
    > Personal website of Owner. Exploring technology through research, consulting, teaching, and outreach.
    
    ## Main API
    - [Public API JSON](https://tusitio.com/api/data.json): Catálogo completo y estructurado de la información del sitio.
    - [Model Context Protocol Server](https://tusitio.com/mcp): Endpoint de comunicación MCP.
    
    ## Main Navigation
    - [Blog](https://tusitio.com/blog.html): Artículos técnicos.
    - [Projects](https://tusitio.com/proyectos.html): Portafolio.
    ```
*   **Estructura de Ejemplo para `auth.md`:**
    Crear [`auth.md`](file:///d:/Programacion/github-davidbuenov/web/auth.md) en la raíz:
    ```markdown
    # auth.md
    
    This is the agent registration specification for tusitio.com.
    
    ## Overview
    This site is public. All resources are key-free. We support the anonymous flow.
    
    ## Discovery
    - Protected Resource: `/.well-known/oauth-protected-resource`
    - Authorization Server: `/.well-known/oauth-authorization-server`
    ```

---

### Paso 3: Descubrimiento de APIs y Seguridad (`.well-known/`)

Expone metadatos de APIs y flujos de autorización estándar para que los agentes inteligentes puedan autenticarse e interactuar con servicios web de forma estructurada.

*   **Diagnóstico de IsItAgentReady:**
    *   *Issue:* El validador busca los metadatos estándar de OAuth, OIDC, firmas y catálogos de APIs y recibe un 404 HTML.
    *   *Recomendación:* Crear archivos de configuración estructurados en formato JSON (y Linkset para el catálogo) dentro de la carpeta oculta `.well-known`.
*   **Especificaciones de Referencia:**
    *   [RFC 9727 - The API Catalog Well-Known URI](https://www.rfc-editor.org/rfc/rfc9727)
    *   [RFC 8414 - OAuth 2.0 Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414)
    *   [RFC 9728 - OAuth 2.0 Protected Resource Metadata](https://www.rfc-editor.org/rfc/rfc9728)
    *   [OpenID Connect Discovery 1.0](http://openid.net/specs/openid-connect-discovery-1_0.html)
    *   [IETF Web Bot Auth Specification](https://datatracker.ietf.org/wg/webbotauth/about/)
*   **Prompt de IA Sugerido:**
    ```text
    Crea la estructura de archivos en la carpeta '.well-known/':
    1. 'api-catalog' con formato Linkset JSON (RFC 9727).
    2. 'oauth-protected-resource' (RFC 9728) indicando que soporta el método 'bearer' por cabecera.
    3. 'oauth-authorization-server' y 'openid-configuration' que incluyan el bloque 'agent_auth' con URIs de registro, claim y revocación para flujo anónimo.
    4. 'http-message-signatures-directory' con un JWKS vacío o válido para Web Bot Auth.
    ```
*   **Estructuras de Archivos Reales:**
    *   **[`api-catalog`](file:///d:/Programacion/github-davidbuenov/web/.well-known/api-catalog):**
        ```json
        {
          "linkset": [
            {
              "anchor": "https://tusitio.com/",
              "profile": "https://www.rfc-editor.org/rfc/rfc9727",
              "item": [
                {
                  "href": "https://tusitio.com/api/data.json",
                  "type": "application/json",
                  "title": "tusitio.com Personal API"
                }
              ]
            }
          ]
        }
        ```
    *   **[`oauth-protected-resource`](file:///d:/Programacion/github-davidbuenov/web/.well-known/oauth-protected-resource):**
        ```json
        {
          "resource": "https://tusitio.com",
          "authorization_servers": [
            "https://tusitio.com"
          ],
          "scopes_supported": [
            "public"
          ],
          "bearer_methods_supported": [
            "header"
          ]
        }
        ```
    *   **[`oauth-authorization-server`](file:///d:/Programacion/github-davidbuenov/web/.well-known/oauth-authorization-server):**
        ```json
        {
          "issuer": "https://tusitio.com",
          "authorization_endpoint": "https://tusitio.com/agent/auth",
          "token_endpoint": "https://tusitio.com/agent/token",
          "jwks_uri": "https://tusitio.com/.well-known/http-message-signatures-directory",
          "response_types_supported": ["token"],
          "grant_types_supported": ["client_credentials"],
          "token_endpoint_auth_methods_supported": ["none"],
          "agent_auth": {
            "skill": "https://tusitio.com/auth.md",
            "register_uri": "https://tusitio.com/agent/register",
            "claim_uri": "https://tusitio.com/agent/claim",
            "revocation_uri": "https://tusitio.com/agent/revoke",
            "identity_types_supported": ["anonymous"],
            "anonymous": {
              "credential_types_supported": ["api_key", "client_credentials"]
            }
          }
        }
        ```
    *   **[`http-message-signatures-directory`](file:///d:/Programacion/github-davidbuenov/web/.well-known/http-message-signatures-directory):**
        ```json
        {
          "keys": [
            {
              "kty": "OKP",
              "crv": "Ed25519",
              "x": "htyMUdnLyIEHQNQW36a3a-ywUEl0Ak37wXMXFyHfqEM",
              "kid": "key-default",
              "use": "sig",
              "alg": "EdDSA"
            }
          ]
        }
        ```

---

### Paso 4: Protocolos de Agentes Emergentes (`agent.json` y `mcp.json`)

Declara la identidad de tus asistentes virtuales y expone los puntos de entrada para el protocolo de contexto Model Context Protocol (MCP).

*   **Diagnóstico de AgentReady.md:**
    *   *Issue:* Ausencia de la tarjeta del agente (`agent.json`) y de la tarjeta del servidor MCP (`mcp.json`).
    *   *Recomendación:* Crear archivos descriptivos que sigan las especificaciones en borrador de Anthropic y A2A (Google).
*   **Especificaciones de Referencia:**
    *   [Model Context Protocol (MCP) Server Card Specification (PR 2127)](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127)
    *   [Google A2A / Agent Card Draft Specification](https://agentready.md)
*   **Prompt de IA Sugerido:**
    ```text
    Crea un archivo 'agent.json' en '.well-known/' declarando el nombre de nuestro bot ('Victoria 2.0'), su descripción, proveedor y sus habilidades principales (como consulta de portafolio). Crea también 'mcp.json' en '.well-known/' que apunte a nuestro endpoint '/mcp' con el transporte 'streamable-http' y declare que soporta 'tools'.
    ```
*   **Código de Ejemplo:**
    *   **[`agent.json`](file:///d:/Programacion/github-davidbuenov/web/.well-known/agent.json) / `agent-card.json`:**
        ```json
        {
          "name": "Asistente Virtual",
          "description": "Asistente inteligente que responde preguntas sobre la trayectoria profesional, proyectos y conferencias del sitio.",
          "url": "https://tusitio.com/api",
          "version": "1.0.0",
          "provider": {
            "name": "Propietario",
            "url": "https://tusitio.com"
          },
          "capabilities": {
            "streaming": true,
            "pushNotifications": false,
            "stateTransitionHistory": false
          },
          "defaultInputModes": ["text"],
          "defaultOutputModes": ["text"],
          "skills": [
            {
              "id": "getPortfolio",
              "name": "Get Portfolio",
              "description": "Retrieve all portfolio items including projects, blog posts, awards, and conferences."
            }
          ]
        }
        ```
    *   **[`mcp.json`](file:///d:/Programacion/github-davidbuenov/web/.well-known/mcp.json) / `server-card.json`:**
        ```json
        {
          "mcpVersion": "1.0.0",
          "serverInfo": {
            "name": "mi-static-mcp",
            "version": "1.0.0"
          },
          "transport": {
            "type": "streamable-http",
            "endpoint": "https://tusitio.com/mcp"
          },
          "capabilities": {
            "tools": {
              "listChanged": false
            },
            "resources": {
              "subscribe": false,
              "listChanged": false
            },
            "prompts": {
              "listChanged": false
            }
          }
        }
        ```

---

### Paso 5: Ecosistema de Habilidades del Agente (`agent-skills/`)

Agrupa y expone guías detalladas en Markdown que explican a un agente autónomo cómo interactuar con herramientas específicas.

*   **Diagnóstico de IsItAgentReady:**
    *   *Issue:* No se encuentra el índice de habilidades criptográficamente verificado.
    *   *Recomendación:* Crear un índice `index.json` conforme a la especificación de Cloudflare que liste las habilidades con sus rutas de manifiesto y sus hashes de integridad correspondientes.
*   **Especificaciones de Referencia:**
    *   [Cloudflare Agent Skills Discovery RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc) / [agentskills.io](https://agentskills.io/)
*   **Prompt de IA Sugerido:**
    ```text
    Genera un directorio '.well-known/agent-skills/'. Dentro, crea carpetas individuales para cada una de nuestras herramientas (ej. 'website-api') y coloca dentro un 'SKILL.md' que explique paso a paso las instrucciones de uso para la IA. Luego, calcula el hash SHA-256 de cada archivo 'SKILL.md' y genera un archivo 'index.json' en '.well-known/agent-skills/' que enlace estas habilidades declarando sus URLs y hashes criptográficos bajo el schema de agentskills.io.
    ```
*   **Código de Ejemplo:**
    *   **[`index.json`](file:///d:/Programacion/github-davidbuenov/web/.well-known/agent-skills/index.json) de Habilidades:**
        ```json
        {
          "$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
          "skills": [
            {
              "name": "website-api",
              "type": "skill-md",
              "description": "Acceso a la API JSON pública de datos del sitio.",
              "url": "https://tusitio.com/.well-known/agent-skills/website-api/SKILL.md",
              "digest": "sha256:INSERTE_EL_HASH_REAL_DEL_ARCHIVO_AQUI"
            }
          ]
        }
        ```
    *   **[`SKILL.md`](file:///d:/Programacion/github-davidbuenov/web/.well-known/agent-skills/website-api/SKILL.md) Individual:**
        ```markdown
        # Website API Agent Skill
        
        This skill allows agents to discover and read the full structure of the website using the public JSON API.
        
        ## Instructions
        1. Fetch `https://tusitio.com/api/data.json` to get the latest database records.
        2. Read keys like 'proyectos' or 'posts' to answer questions.
        ```
    > [!TIP]
    > En Windows, puedes calcular el hash SHA-256 de tu archivo rápidamente ejecutando el comando PowerShell: `(Get-FileHash .\SKILL.md -Algorithm SHA256).Hash.ToLower()`

---

### Paso 6: Integración del Model Context Protocol (MCP)

Establece una doble vía para la provisión de herramientas: en el cliente (mediante el navegador) y en el servidor (manejador JSON-RPC 2.0).

*   **Diagnóstico de IsItAgentReady / SiteSpeak:**
    *   *Issue:* Fallo en la sección de WebMCP o ausencia de respuesta operativa a peticiones HTTP POST JSON-RPC.
    *   *Recomendación:* Programar tanto la llamada experimental de WebMCP en javascript, como un backend que responda a los métodos estándar de MCP (`initialize`, `tools/list` y `tools/call`).
*   **Especificaciones de Referencia:**
    *   [WebMCP Draft Proposal](https://webmachinelearning.github.io/webmcp/) / [Chrome WebMCP Blog](https://developer.chrome.com/blog/webmcp-epp)
    *   [Model Context Protocol Specifications](https://modelcontextprotocol.io/)
*   **Prompt de IA Sugerido:**
    ```text
    Implementa WebMCP en nuestro archivo JavaScript cliente agregando la función experimental 'navigator.modelContext.provideContext()' en la carga de la página para ofrecer la herramienta 'getProfileData'. Además, implementa un manejador HTTP en Node.js para el endpoint '/mcp' que valide el protocolo JSON-RPC 2.0: debe responder a peticiones POST para los métodos 'initialize', 'tools/list' y 'tools/call' (retornando la base de datos en JSON).
    ```
*   **Código de Ejemplo:**
    *   **Lógica WebMCP (Cliente):**
        ```javascript
        function registerWebMCP() {
            if ("modelContext" in navigator && navigator.modelContext && navigator.modelContext.provideContext) {
                const toolSchema = {
                    name: "getProfileData",
                    description: "Obtiene los datos profesionales en JSON.",
                    inputSchema: { type: "object", properties: {} },
                    execute: async () => {
                        const res = await fetch('/api/data.json');
                        return await res.json();
                    }
                };
                navigator.modelContext.provideContext(toolSchema);
            }
        }
        window.addEventListener('load', registerWebMCP);
        ```
    *   **Lógica de Servidor MCP (Extracto del backend en Express/Functions):**
        Consulte la sección `/mcp` de [`dbvdocs/index.js`](file:///d:/Programacion/github-davidbuenov/web/dbvdocs/index.js) para ver un servidor MCP real completo implementado bajo HTTP sin estado para entornos serverless.

---

### Paso 7: Negociación de Contenido Markdown (Markdown Negotiation)

Permite que cuando un cliente inteligente envíe la cabecera HTTP `Accept: text/markdown`, el servidor le responda con la representación en texto plano Markdown de la página solicitada, optimizando enormemente la ventana de contexto del modelo.

*   **Diagnóstico de IsItAgentReady:**
    *   *Issue:* El sitio web solo sirve HTML, lo que penaliza la lectura de los rastreadores debido a las etiquetas de estructura.
    *   *Recomendación:* Configurar una redirección/negociador de contenido que responda con la versión `.md` y la cabecera `Vary: Accept`.
*   **Especificaciones de Referencia:**
    *   [Cloudflare Markdown for Agents Developer Docs](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
*   **Prompt de IA Sugerido:**
    ```text
    Implementa un sistema de negociación de contenido en nuestro sitio Jekyll. 
    1. Escribe un plugin en Ruby para Jekyll que se ejecute post-build y replique todas las páginas HTML a su equivalente en Markdown (.md) conservando la misma estructura.
    2. Desarrolla una función intermedia (en Express o Cloud Functions) que analice si la cabecera 'Accept' incluye 'text/markdown'. Si es así, sirve el archivo '.md' correspondiente con cabeceras 'Content-Type: text/markdown' e inyecta la cabecera 'Vary: Accept'. De lo contrario, sirve el HTML tradicional.
    ```
*   **Código de Ejemplo (Plugin Jekyll en Ruby):**
    Consulte el plugin completo [`_plugins/markdown_generator.rb`](file:///d:/Programacion/github-davidbuenov/web/_plugins/markdown_generator.rb) para ver cómo clonar y traducir Liquid al vuelo y guardar copias `.md` de todo el sitio estático compilado.
*   **Código del Negociador (Backend):**
    Consulte el manejador `contentNegotiator` en [`dbvdocs/index.js`](file:///d:/Programacion/github-davidbuenov/web/dbvdocs/index.js#L736-L939) para ver la resolución de archivos locales `.md`/`.html` basada en cabeceras.

---

### Paso 8: SEO Semántico y Grafo de Entidades (Schema.org JSON-LD)

Estructura los datos de tu sitio web tradicional en un grafo de conocimiento profesional legible por los algoritmos de IA y motores de búsqueda semánticos.

*   **Diagnóstico de AgentReady.md / Luminary Lane:**
    *   *Issue:* Los datos de contacto, proyectos y publicaciones se leen de forma cruda sin conexión relacional formal.
    *   *Recomendación:* Exponer metadatos en JSON-LD (Schema.org) interconectando entidades mediante identificadores únicos (`@id`).
*   **Especificaciones de Referencia:**
    *   [Schema.org Vocabularies](https://schema.org)
    *   [W3C JSON-LD 1.1 Specification](https://www.w3.org/TR/json-ld11/)
*   **Prompt de IA Sugerido:**
    ```text
    Crea un archivo de datos estructurados JSON-LD unificado (Professional Knowledge Graph) que declare una entidad de tipo 'Person' (#person), y enlace a esta entidad sus afiliaciones profesionales, conferencias ('Event' con sus IDs respectivos) y proyectos desarrollados ('SoftwareApplication' o 'CreativeWork' conectados). Enlaza este JSON-LD en el head de cada página usando una etiqueta link de tipo alternate 'application/ld+json'.
    ```
*   **Código de Ejemplo:**
    Consulte [`knowledge-graph.json.liquid`](file:///d:/Programacion/github-davidbuenov/web/knowledge-graph.json.liquid) para ver la implementación real del grafo unificado de relaciones.

---

### Paso 9: Configuración DNS para Descubrimiento de IA (DNS-AID)

Habilita el autodescubrimiento rápido a nivel de resolución de nombres de dominio de forma segura mediante DNSSEC.

*   **Diagnóstico de IsItAgentReady:**
    *   *Issue:* DNS-AID well-known records not found.
    *   *Recomendación:* Publicar registros de tipo `HTTPS` (ServiceMode SVCB/HTTPS) específicos en la zona DNS.
*   **Especificaciones de Referencia:**
    *   [IETF Draft: DNS for AI Discovery (DNS-AID)](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)
    *   [RFC 9460 - Service Binding and Parameter Specification in the DNS (SVCB and HTTPS)](https://www.rfc-editor.org/rfc/rfc9460)
*   **Estructura del Registro a Configurar (en tu registrador DNS compatible):**
    *   **Nombre de Host:** `_index._agents.tudominio.com`
    *   **Tipo de Registro:** `HTTPS`
    *   **Valor/Ruta:** `0 .` (o configuración del puerto de descubrimiento dinámico si aplica)

---

## 4. Infraestructura de Despliegue e Inyección de Cabeceras (Firebase)

Dado que las cabeceras HTTP son la primera respuesta de red que recibe un agente inteligente, es crucial inyectar metadatos de descubrimiento directamente en las cabeceras de la página principal (Home) y declarar explícitamente los tipos MIME de los archivos sin extensión.

En **Firebase Hosting**, esto se configura en el archivo [firebase.json](file:///d:/Programacion/github-davidbuenov/web/dbvdocs/firebase.json):

```json
{
  "hosting": {
    "public": "_site",
    "headers": [
      {
        "source": "/",
        "headers": [
          {
            "key": "Link",
            "value": "</.well-known/agent-skills/index.json>; rel=\"agent-skills\", </.well-known/mcp/server-card.json>; rel=\"mcp-server-card\", </.well-known/api-catalog>; rel=\"api-catalog\""
          }
        ]
      },
      {
        "source": "/.well-known/api-catalog",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/linkset+json; profile=\"https://www.rfc-editor.org/rfc/rfc9727\""
          }
        ]
      },
      {
        "source": "/.well-known/oauth-authorization-server",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "**",
        "function": "contentNegotiator"
      }
    ]
  }
}
```

---

## 5. Configuración de Puentes Locales y Clientes

Una de las grandes ventajas de exponer un endpoint MCP es que permite a los asistentes locales (como Claude Desktop, Cursor o Zed) interactuar con tus datos en desarrollo local sin necesidad de SSE persistentes complejos. 

Para lograrlo, se implementa un **puente local STDIO-a-HTTP** en Node.js que reenvía peticiones de tu IDE hacia la Cloud Function remota.

### Script del Puente (`mcp-bridge.js`):
```javascript
#!/usr/bin/env node
const readline = require('readline');
const ENDPOINT = 'https://tusitio.com/mcp';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  if (!line.trim()) return;
  try {
    const jsonRequest = JSON.parse(line);
    
    // Ignorar respuestas a notificaciones JSON-RPC (sin id)
    if (jsonRequest.id === undefined || jsonRequest.id === null) {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonRequest)
      }).then(r => r.text());
      return;
    }

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonRequest)
    });
    
    const jsonResponse = await response.json();
    process.stdout.write(JSON.stringify(jsonResponse) + '\n');
  } catch (error) {
    const errResponse = {
      jsonrpc: "2.0",
      error: { code: -32603, message: error.message },
      id: null
    };
    process.stdout.write(errResponse + '\n');
  }
});
```

### Configuración en Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "mi-mcp-personal": {
      "command": "node",
      "args": ["C:\\Ruta\\a\\mcp-bridge.js"]
    }
  }
}
```

---

## 6. Referencias y Especificaciones Oficiales

A continuación se recopilan los recursos y estándares formales que regulan las especificaciones analizadas en este taller:

*   **Robots.txt & AI Crawlers:**
    *   RFC 9309 (Exclusión de Robots): [https://www.rfc-editor.org/rfc/rfc9309](https://www.rfc-editor.org/rfc/rfc9309)
    *   Directivas de rastreo de IA en Cloudflare: [https://developers.cloudflare.com/ai-crawl-control/](https://developers.cloudflare.com/ai-crawl-control/)
*   **Content Signals:**
    *   Borrador Content-Signal en IETF: [https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/](https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/)
    *   Portal oficial de Content Signals: [https://contentsignals.org/](https://contentsignals.org/)
*   **llms.txt & Markdown Negotiation:**
    *   Portal de llms.txt: [https://llmstxt.org/](https://llmstxt.org/)
    *   Negociación de Markdown en Cloudflare: [https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
*   **API Catalog & OAuth / OIDC Discovery:**
    *   RFC 9727 (api-catalog): [https://www.rfc-editor.org/rfc/rfc9727](https://www.rfc-editor.org/rfc/rfc9727)
    *   RFC 8414 (OAuth Server Metadata): [https://www.rfc-editor.org/rfc/rfc8414](https://www.rfc-editor.org/rfc/rfc8414)
    *   RFC 9728 (OAuth Protected Resource Metadata): [https://www.rfc-editor.org/rfc/rfc9728](https://www.rfc-editor.org/rfc/rfc9728)
    *   OpenID Connect Discovery 1.0: [http://openid.net/specs/openid-connect-discovery-1_0.html](http://openid.net/specs/openid-connect-discovery-1_0.html)
*   **Auth.md Agent Registration:**
    *   Documentación de WorkOS: [https://workos.com/auth-md](https://workos.com/auth-md)
    *   Repositorio oficial de especificación: [https://github.com/workos/auth.md](https://github.com/workos/auth.md)
*   **Model Context Protocol (MCP) & WebMCP:**
    *   WebMCP API Draft: [https://webmachinelearning.github.io/webmcp/](https://webmachinelearning.github.io/webmcp/)
    *   Model Context Protocol (MCP) Portal: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
    *   Borrador de MCP Server Card (PR 2127): [https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127)
*   **Agent Skills Discovery:**
    *   Borrador de especificación en GitHub: [https://github.com/cloudflare/agent-skills-discovery-rfc](https://github.com/cloudflare/agent-skills-discovery-rfc)
    *   Portal oficial: [https://agentskills.io/](https://agentskills.io/)
*   **DNS for AI Discovery (DNS-AID):**
    *   IETF Draft DNS-AID: [https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)
    *   RFC 9460 (HTTPS/SVCB DNS): [https://www.rfc-editor.org/rfc/rfc9460](https://www.rfc-editor.org/rfc/rfc9460)
*   **JSON-LD & Schema.org:**
    *   Estándar JSON-LD W3C: [https://www.w3.org/TR/json-ld11/](https://www.w3.org/TR/json-ld11/)
    *   Esquemas y vocabulario oficial: [https://schema.org](https://schema.org)
