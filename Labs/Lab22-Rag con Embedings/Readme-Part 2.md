# 🧪 Laboratorio: RAG con LangChain, ChromaDB y OpenAI

## 📚 Introducción

Esta guía de laboratorio te llevará a través del proceso de creación de un sistema de Generación Aumentada por Recuperación (RAG) utilizando LangChain, ChromaDB y OpenAI. Construiremos un chatbot capaz de responder preguntas basándose en información extraída de documentos PDF.

## 🛠️ Configuración

Primero, instalemos las bibliotecas necesarias:

```bash
pip install langchain langchain-community langchain-core pypdf openai tiktoken
pip install langchain_openai sentence-transformers chromadb gradio
```

## 📁 Carga de Documentos PDF

Comenzaremos cargando documentos PDF en nuestro sistema:

```python
import os
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

documentos = []
pdfs = os.listdir("pdfs")
for pdf in pdfs:
    if os.path.isfile(f"pdfs/{pdf}"):
        docs = PyPDFLoader(f"pdfs/{pdf}").load()
        for doc in docs:
            documentos.append(doc)

print(len(documentos))
```

Este código:
1. Lista todos los archivos en el directorio "pdfs"
2. Carga cada archivo PDF usando PyPDFLoader
3. Añade cada página de cada PDF a la lista `documentos`

## 🔑 Configuración de la API de OpenAI

Necesitarás una clave de API de OpenAI. Obtén una en [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

```python
api_key = input("Ingresa tu clave de API de OpenAI: ")
```

## 🧠 Creación de Embeddings

Ahora, creemos embeddings para nuestros documentos:

```python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(openai_api_key=api_key)
for doc in documentos:
    if doc:
        embeddings.embed_documents(doc.page_content)

print(embeddings)
```

Este paso convierte nuestro texto en representaciones numéricas que capturan el significado semántico.

## 💾 Creación de una Base de Datos ChromaDB

Usaremos ChromaDB para almacenar los embeddings de nuestros documentos:

```python
from langchain_community.vectorstores import Chroma
db = Chroma.from_documents(documentos, embeddings, persist_directory="db")
db.persist()
```

Esto crea una base de datos consultable de los embeddings de nuestros documentos.

## 🤖 Creación del Chatbot

Ahora, creemos nuestro chatbot usando Gradio:

```python
import gradio as gr
from openai import OpenAI

def responder(prompt):
    client = OpenAI(api_key=api_key)
    retriever = db.as_retriever()
    
    query = prompt
    relevant_docs = retriever.get_relevant_documents(query)
    
    context = "".join([doc.page_content for doc in relevant_docs]).replace("\n"," ")
    
    revised_prompt = f"Aquí está la información relevante:\n{context}\n\nPor favor, responde a la pregunta: {query}"
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": revised_prompt
            }
        ]
    )
    
    return response.choices[0].message.content

iface = gr.Interface(fn=responder, inputs="text", outputs="text")
iface.launch()
```

Esta función:
1. Recupera documentos relevantes basados en la consulta del usuario
2. Combina la información relevante en un contexto
3. Envía un prompt revisado a la API de OpenAI
4. Devuelve la respuesta de la IA

## 🚀 Lanzamiento del Chatbot

Ejecuta el código y tu chatbot estará disponible a través de una interfaz Gradio. ¡Ahora puedes hacer preguntas relacionadas con el contenido de tus documentos PDF!

## 🔍 Prueba

Intenta con este prompt para probar tu chatbot:

```
"Muéstrame cómo hacer una llamada a la API de OpenAI en Python para responder a un prompt usando la biblioteca OpenAI en GPT-4."
```

## 📝 Nota sobre Mejoras

Para un mejor rendimiento, considera embeber el prompt en sí:

```python
from openai import OpenAI

client = OpenAI(api_key=api_key)

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']

def responder(prompt):
    try:
        prompt_embedding = get_embedding(prompt)
        relevant_docs = db.search(prompt_embedding)
        
        context = "".join([doc.page_content for doc in relevant_docs]).replace("\n", " ")
        
        revised_prompt = f"Aquí está la información relevante:\n{context}\n\nPor favor, responde a la pregunta: {prompt}"
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": revised_prompt}
            ]
        )
        
        return response.choices[0].message['content']
    except Exception as e:
        return f"Error: {str(e)}"

iface = gr.Interface(fn=responder, inputs="text", outputs="text")
iface.launch()
```

Esta versión mejorada embebe el prompt del usuario, permitiendo una recuperación más precisa de documentos relevantes.

¡Feliz experimentación con tu sistema RAG! 🎉