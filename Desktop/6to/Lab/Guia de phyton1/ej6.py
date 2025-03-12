print('Ingrese el numero q uiere modificar')
n1 = float(input())
print('Que operacion desea realizar: sum, res, mult, div')
operacion = input('')
print(f'Con que numero quiere {operacion} a {n1}')
n2 = float(input())

def operaciones (n1,n2):
    if operacion == 'sum':
        n1 += n2
    if operacion == 'res':
        n1 -= n2
    if operacion == 'mult':
        n1 *= n2
    if operacion == 'div':
        n1 /= n2
    return n1
    
print(f'Su resultado es {operaciones (n1,n2)}')