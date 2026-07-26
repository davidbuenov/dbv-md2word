# Instrucciones del Proyecto para Claude Code

Este proyecto sigue la metodología **Spec-Driven Development (SDD)**. Lee estos archivos al inicio de cada sesión antes de proponer cualquier código o plan:

| Archivo | Propósito |
| --- | --- |
| `dbv-specs-ops/project.config.md` | Identidad del proyecto: nombre, autor, licencia y plantilla de cabeceras |
| `dbv-specs-ops/docs/MASTER_PROMPT.md` | Workflow obligatorio, normas y límites |
| `dbv-specs-ops/docs/SPECIFICATIONS.md` | Requisitos del proyecto actual |
| `dbv-specs-ops/docs/ARCHITECTURE.md` | Stack y decisiones técnicas |
| `dbv-specs-ops/docs/DESIGN.md` | Sistema de diseño visual: tokens de color, tipografía, componentes y filosofía *(si existe)* |
| `dbv-specs-ops/memory.md` | **Contexto y Decisiones:** Conocimiento cualitativo (ADRs, lecciones, mapa) |
| `dbv-specs-ops/task.md` | Estado actual + Snapshot de Contexto |

## ⚠️ Reglas Core (Puntero Fuerte)

**Lee `dbv-specs-ops/docs/MASTER_PROMPT.md` y sigue su flujo de trabajo estrictamente. Si detectas contradicciones entre el prompt y las especificaciones del proyecto, detente e informa antes de proceder.**
Toda la lógica de inicialización (Bootstrap), comprobación de estado (Specs Check), ciclo de vida (Workflow) y estándares de código están definidos centralizadamente allí para evitar redundancia cognitiva.


> 🛠️ Framework SDD creado por **[David Bueno Vallejo](https://github.com/davidbuenov)** — libre y gratuito · [dbv-specs-ops](https://github.com/davidbuenov/dbv-specs-ops)
