//ver archivo snippets.js

function hola(){
    alert("hola");
}

//una funcion que ordende un arreglo con merge sort
function fn_ordenar__Array__mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);

  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(
    fn_ordenar__Array__mergeSort(left),
    fn_ordenar__Array__mergeSort(right)
  );
}

//una funcion que invierta un array
function fn_invertir__Array__invertir(arr) {
  return arr.reverse();
}







