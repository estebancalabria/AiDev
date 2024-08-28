# 🚀 Ejemplo Simple de RAG con LangChain y OpenAI

## 📚 Instalación de Dependencias

Primero, instalemos las bibliotecas necesarias:

```bash
pip install langchain langchain_core langchain_community langchain_openai openai chromadb
```

## 🧠 Generación de Embeddings

Vamos a generar embeddings para una lista de frases:

```python
from langchain_openai import OpenAIEmbeddings

api_key = input("Ingrese su API key de OpenAI: ")
embeddings = OpenAIEmbeddings(openai_api_key=api_key)

documentos = [
    "Guerra muerte destruccion ansiedad",
    "Amor primavera flores bienestar relaciones",
    "economia finanzas dinero dolar bolsa",
    "Relaciones de pareja, bienestar, quererse, estar bien",
    "Tecnologia, celuares, inteligencia artificial, avance",
    "Programacion, C#, Java, Python",
    "Primavera, bienestar, querer al projimo, ser felices, hacer el bien",
    "Pareja, casamiento, relaciones, matrimonio, union en amor, familia"
]

embeddings.embed_documents(documentos)
print(documentos)
```

Este código crea embeddings para cada frase en nuestra lista de `documentos`.

## 💾 Almacenamiento en Base de Datos Vectorial

Guardemos los embeddings en una base de datos vectorial:

```python
from langchain_community.vectorstores import Chroma

db = Chroma.from_texts(documentos, embeddings, persist_directory="chroma")
db.persist()
```

Esto crea una base de datos Chroma con nuestros documentos y sus embeddings.

## 🔍 Recuperación de Documentos Relacionados

Ahora, podemos recuperar documentos relacionados a una consulta:

```python
query = input("¿Sobre qué quieres consultar? ")
documentos = db.as_retriever().get_relevant_documents(query)

for doc in documentos:
    print(doc.page_content)
```

Este código busca los documentos más relevantes basados en la consulta del usuario.

## 🎭 RAG (Prompt con Esteroides)

Finalmente, usemos RAG para generar un poema basado en la consulta y el contexto:

```python
from openai import OpenAI

client = OpenAI(api_key = api_key)

query = input("¿Sobre qué quieres escribir un poema? ")
documentos = db.as_retriever().get_relevant_documents(query)
contexto = "\n".join([doc.page_content for doc in documentos])

print(contexto)
print("----------------")

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": f"Quiero un poema sobre {query} que use estas palabras {contexto}. Pon entre * * las palabras que usas de las que te indiqué"}
    ]
)

print(response.choices[0].message.content)
```

Este código:
1. Pide al usuario un tema para el poema
2. Recupera documentos relevantes de nuestra base de datos
3. Crea un contexto con esos documentos
4. Usa la API de OpenAI para generar un poema basado en el tema y el contexto
5. Imprime el poema resultante

## 🎉 Conclusión

¡Felicidades! Has creado un sistema RAG simple que puede generar poemas basados en un tema dado, utilizando un contexto relevante. Este ejemplo muestra cómo RAG puede mejorar la generación de texto al proporcionar información contextual relevante.