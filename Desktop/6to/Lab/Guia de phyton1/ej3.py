print('Que operacion desea realizar: sum, res, mult, div')
operacion = input('')
print('Ingrese su primer numero')
n1 = float(input())
print('Ingrese su segundo numero')
n2 = float(input())

if operacion == 'sum':
    res = n1 + n2
if operacion == 'res':
    res = n1 - n2
if operacion == 'mult':
    res = n1 * n2
if operacion == 'div':
    res = n1 / n2
    
print(f'Su resultado es {res}')