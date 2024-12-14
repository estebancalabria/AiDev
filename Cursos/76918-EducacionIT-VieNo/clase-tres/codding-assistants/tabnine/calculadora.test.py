
from tabnine.calculadora import sumar

def test_sumar_positive_integers():
    assert sumar(3, 5) == 8
    assert sumar(10, 20) == 30
    assert sumar(100, 200) == 300

def test_sumar_positive_floats():
    assert sumar(3.5, 4.7) == 8.2
    assert sumar(10.5, 20.8) == 31.3
    assert sumar(100.5, 200.8) == 301.3

def test_sumar_positive_integer_and_float():
    assert sumar(3, 4.7) == 7.7
    assert sumar(10, 20.8) == 30.8
    assert sumar(100, 200.8) == 300.8