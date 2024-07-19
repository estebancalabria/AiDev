# Laboratorio: Explorando GitHub Copilot CLI en un Curso de IA

## Objetivo
En este laboratorio, los estudiantes aprenderán a utilizar GitHub Copilot CLI, una herramienta de inteligencia artificial diseñada para asistir en tareas de línea de comandos. Este ejercicio práctico permitirá a los estudiantes comprender cómo la IA puede mejorar la productividad en el desarrollo de software y la administración de sistemas.

## Prerrequisitos
- Una cuenta de GitHub con licencia de GitHub Copilot
- GitHub CLI instalado en su sistema
- Conocimientos básicos de línea de comandos

## Pasos del laboratorio

### 1. Configuración inicial

1.1. Abra su terminal preferida.

1.2. Verifique que GitHub CLI esté instalado:
```bash
gh --version
```

1.3. Si no está instalado, siga las [instrucciones oficiales de instalación](https://github.com/cli/cli#installation).

1.4. Inicie sesión en su cuenta de GitHub:
```bash
gh auth login
```

1.5. Instale la extensión de GitHub Copilot para CLI:
```bash
gh extension install github/gh-copilot
```

### 2. Exploración básica de GitHub Copilot CLI

2.1. Familiarícese con los comandos disponibles:
```bash
gh copilot --help
```

2.2. Configure GitHub Copilot CLI según sus preferencias:
```bash
gh copilot config
```

### 3. Utilizando el comando `suggest`

3.1. Solicite una sugerencia para un comando de shell:
```bash
gh copilot suggest -t shell "list files in current directory"
```

3.2. Analice la sugerencia proporcionada. ¿Es precisa? ¿Cómo se compara con su conocimiento existente?

3.3. Ahora, pruebe con una tarea más compleja:
```bash
gh copilot suggest -t shell "find all Python files larger than 1MB"
```

3.4. Compare las sugerencias para diferentes sistemas operativos:
```bash
gh copilot suggest -t shell "show system information on Windows"
gh copilot suggest -t shell "show system information on Linux"
gh copilot suggest -t shell "show system information on macOS"
```

### 4. Explorando comandos de Git y GitHub

4.1. Solicite ayuda para crear un nuevo repositorio:
```bash
gh copilot suggest "create a new GitHub repository"
```

4.2. Pida una sugerencia para clonar un repositorio específico:
```bash
gh copilot suggest "clone TensorFlow repository"
```

4.3. Obtenga ayuda para crear una nueva rama y realizar un commit:
```bash
gh copilot suggest "create a new branch called 'feature-ai' and commit a file named 'ai_model.py'"
```

### 5. Utilizando Copilot para tareas de IA

5.1. Solicite un comando para instalar TensorFlow:
```bash
gh copilot suggest -t shell "install TensorFlow using pip"
```

5.2. Pida ayuda para ejecutar un script de Python que entrene un modelo de IA:
```bash
gh copilot suggest -t shell "run a Python script that trains a neural network on MNIST dataset"
```

5.3. Obtenga una sugerencia para visualizar los resultados del entrenamiento:
```bash
gh copilot suggest -t shell "visualize training results using matplotlib"
```

### 6. Análisis y reflexión

6.1. Para cada sugerencia recibida, evalúe:
- Precisión de la sugerencia
- Relevancia para la tarea solicitada
- Claridad y facilidad de comprensión

6.2. Reflexione sobre las siguientes preguntas:
- ¿Cómo puede GitHub Copilot CLI mejorar su flujo de trabajo en proyectos de IA?
- ¿Cuáles son las limitaciones que observó en las sugerencias de Copilot?
- ¿Cómo podría integrar esta herramienta en sus futuros proyectos de IA?

### 7. Desafío final

7.1. Utilice GitHub Copilot CLI para obtener ayuda en la creación de un pipeline completo de IA, desde la preparación de datos hasta el despliegue del modelo. Documente cada paso y las sugerencias proporcionadas por Copilot.

## Entrega

Prepare un informe que incluya:
1. Capturas de pantalla de las sugerencias más interesantes o útiles que recibió.
2. Un resumen de sus reflexiones sobre el uso de GitHub Copilot CLI en el contexto de la IA.
3. Una discusión sobre los beneficios y limitaciones de usar herramientas de IA como asistentes en el desarrollo de proyectos de IA.
4. Su solución documentada para el desafío final.

## Recursos adicionales
- [Documentación oficial de GitHub Copilot](https://docs.github.com/en/copilot)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Mejores prácticas para prompts de IA](https://www.anthropic.com/index/a-guide-to-writing-prompts-for-text-based-ai-tools)

---

¡Buena suerte y disfrute explorando el potencial de la IA en el desarrollo de software!