print('Ingrese su nombre')
name = input('')
print('Ingrese su edad')
age = int(input())
print('Ingrese su ciudad de residencia')
city = input('')

def año_nac (age):
    res = 2025 - age
    return res
print(f'Hola {name}')
print(f'Usted nacion en {año_nac (age)}')
print(f'Vivis en {city}')
if age < 18:
    print('Sos menor de edad')
else:
    print('Sos mayor de edad')
if año_nac (age) % 5 == 0:
    print('Tu edad es multiplo de 5')
else:
    print('Tu edad no es multiplo de 5')