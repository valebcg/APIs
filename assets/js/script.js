let inputAmount= document.querySelector("#inputAmount");
let selectTypeMoney= document.querySelector ("#selectTypeMoney");
let btn= document.querySelector ("#btn");
let dataArray = [] //Guarda el array que se obtiene del servidor
let myChart = null
let lastchange = 0;

async function ConectionServer() {
  try {
    currency = selectTypeMoney.value;
    const res = await fetch(`https://mindicador.cl/api/${currency}`)
    const data = await res.json()
     lastchange = (data.serie[0].valor);
    let test = (data.serie);
    calculo();

    dataArray = data.serie.slice(0,10); // Aca es donde guardo el array original en la variable dataArray
    const datChange = dataArray.map((x) => x.valor)  //Aca creo una nueva variable para que tome las fechas Label
    const datLabel = dataArray.map((x) => x.fecha.slice(0,10)) //Aca creo una nueva variable para que tome las fechas Label

    //Aca envio los datos al grafico
    chartRender(datLabel, datChange)
    document.querySelector("#error").innerHTML = 'Mensaje del Servidor: conexión realizada'
  } catch (e) {
     document.querySelector("#error").innerHTML = 'Mensaje del Servidor: No se pudo establecer la conexión'
     document.querySelector("#resultado").innerHTML= "...";
   
  }
}


//*Este es el grafico**
function chartRender(datLabel, datChange) {
  
  const ctx = document.getElementById('myChart').getContext('2d')
  if (myChart != null) {
    myChart.destroy()
  }
  myChart = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: datLabel.reverse(),
      datasets: [
        {
          label: `Valor: ${currency.toUpperCase()}`,
          data: datChange.reverse(),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          beginAtZero: true,
        },
      },
    },
  })
}

function calculo () {
  let resultado = Number((inputAmount.value / lastchange).toFixed(2));
 document.querySelector("#resultado").innerHTML= "Resultado  :  " + resultado;
}

btn.addEventListener("click", () =>{
  if (inputAmount.value=="") {
    alert("Debe ingresar un valor")
    return
  }

  if (isNaN(inputAmount.value)) {
    alert('Solo puedes ingresar valores numéricos en la cantidad aconvertir')
    return
  }


  ConectionServer()
})