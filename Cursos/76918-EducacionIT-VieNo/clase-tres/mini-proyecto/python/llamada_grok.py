# Quiero un programa que me pregunte mi api key de grok y luego haga unaa
# llamada a la api de grok para que me genere una respuesta a una pregunta
# ya instale groq con pip install groq

import groq

api_key = input("Ingrese su API key de Groq: ")

client = groq.Client(api_key=api_key)

pregunta = input("Ingrese su pregunta: ")

response = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[{"role": "user", "content": pregunta}],
)

print(response.choices[0].message.content)
    
