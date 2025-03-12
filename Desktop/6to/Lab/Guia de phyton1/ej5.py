print('Ingrese su primer numero a comparar')
n1 = int(input())
print('Ingrese su segundo numero a comparar')
n2 = int(input())

def comparar (n1, n2):
    if n1 == n2:
        res ='Sus numeros son iguales'
    else:
        res = 'Sus numeros no son iguales'
    return res

print(comparar (n1, n2))

