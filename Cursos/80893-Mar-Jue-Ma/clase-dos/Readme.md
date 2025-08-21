# Clase Dos - 21 de Agosto 2025

## Usando un LLM por medio de la API

Cada vez hay mas aplicaciones que utilizan IA : https://theresanaiforthat.com/

1. Acceder al google colab https://colab.google/
2. Hacer un "hola mundo" en python en mi primer celda de codigo
3. Chumear la pagina de desarollador de chatgpt : https://platform.openai.com/
4. La api de chartgpt es paga, vimos como podemos utilizarla si quisieramos cargar creditos
5. En su lugar vamos a utilizar la version Gratuita
        * Conozcamos Groq : https://groq.com/
        * Su Web para developer es : https://console.groq.com/
6. Sacar api key
7. El colab donde esta todo el codigo que hicimos se puede ver en

> https://colab.research.google.com/drive/16PZgVgmJ1L0jmWv6Puo56kHHwstPJu_H?usp=sharing

Un ejemplo de codigo es

```python
from groq import Groq

mi_api_key = input("Ingrese su Api Key")


client = Groq(
    api_key=mi_api_key,
)

prompt = input("Ingrese su prompt")

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="openai/gpt-oss-20b",
    stream=False,
)

print(chat_completion.choices[0].message.content)
```

8.  
