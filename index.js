var yAxisFirstPackage = [];
var yAxisSecondPackage = [];
var xAxis = [];
var timeInterval = 7;
var FirstPackage;
var SecondPackage;

const chart = document.getElementsByClassName('CHARTJS')[0]

const stats = document.getElementsByClassName('CHARTJS')[1]

const firstCell =  document.getElementById('FirstCell')

const secondCell =  document.getElementById('SecondCell')

const firstCellDownloads = document.getElementById('FirstCellTotalDownloads')

const secondCellDownloads = document.getElementById('SecondCellTotalDownloads')



const FirstPackageTextInput = document.getElementById('searchText');

const SecondPackageTextInput = document.getElementById('npmTextValue');

FirstPackageTextInput.addEventListener('change', (event) => {
  FirstPackage = `${event.target.value}`;
});

FirstPackageTextInput.addEventListener('change', (event) => {
  SecondPackage = `${event.target.value}`;
});


// Get the value for selected date range
const select = document.getElementById('SelectOption');
select.addEventListener('change', e =>{
    timeInterval = select.options[select.selectedIndex].value;
    ShowFirstPackage()
    ShowSecondPackage();
  });


// Push each day to the xAxis array
const  CalculateDate = async (NumberOfDays) => {
  // Empty the array
  xAxis = [];
  // For loop to iterate between the dates
  for(var i = 1; i <= NumberOfDays; i++){
    let today = new Date();
    today.setDate(today.getDate() - i);
    xAxis.push(today.getFullYear()+'-'+(today.getMonth()+1) +'-'+today.getDate());

  }
}

const ShowFirstPackage = async ()=> {
  chart.style.display = "flex";
  stats.style.display = "table";
  FirstPackage = document.getElementById(`searchText`).value;
  CalculateDate(timeInterval)
  try {
    responseFirstPackage = await Promise.all(
      xAxis.map(date => fetch(`https://api.npmjs.org/downloads/point/${date}/${FirstPackage}`)
        .then(res => res.json())))
   yAxisFirstPackage = responseFirstPackage.map(a => a.downloads)
   myChart.config.data.labels = xAxis;
   myChart.config.data.datasets[0].data = yAxisFirstPackage;
   myChart.config.data.datasets[0].label = FirstPackage;
   myChart.update()
   firstCell.innerText = FirstPackage;
   const SumFirstPackageDownloads = yAxisFirstPackage.reduce((total, a) => total + a, 0);
   firstCellDownloads.innerText = SumFirstPackageDownloads.toLocaleString();
  } catch (error) {
    console.log("Error", error)
  }
  const firstCellnpm = document.getElementById('FirstCellnpm')

  const firstCellhomepage = document.getElementById('FirstCellhomepage')

  const firstCellgithub = document.getElementById('FirstCellgithub')

  fetchData(`https://registry.npmjs.org/-/v1/search?text=${FirstPackage}`)
    .then(data =>{
      firstCellnpm.href=data.objects[0].package.links.npm
      firstCellhomepage.href=data.objects[0].package.links.homepage
      firstCellgithub.href=data.objects[0].package.links.repository

    })
}

const ShowSecondPackage = async ()=> {
  chart.style.display = "flex";
  stats.style.display = "table";
  SecondPackage = document.getElementById(`npmTextValue`).value;
  CalculateDate(timeInterval)
  try {
    responseSecondPackage = await Promise.all(
      xAxis.map(date => fetch(`https://api.npmjs.org/downloads/point/${date}/${SecondPackage}`)
        .then(res => res.json())))
   yAxisSecondPackage = responseSecondPackage.map(a => a.downloads)
   myChart.config.data.labels = xAxis;
   myChart.config.data.datasets[1].data = yAxisSecondPackage;
   myChart.config.data.datasets[1].label = SecondPackage;
   myChart.update()
   secondCell.innerText = SecondPackage;
   const SumsecondPackageDownloads = yAxisSecondPackage.reduce((total, a) => total + a, 0);
   secondCellDownloads.innerText = SumsecondPackageDownloads.toLocaleString();
  } catch (error) {
    console.log("Error", error)
  }

  const secondCellnpm = document.getElementById('SecondCellnpm')

  const secondCellhomepage = document.getElementById('SecondCellhomepage')

  const secondCellgithub = document.getElementById('SecondCellgithub')

  fetchData(`https://registry.npmjs.org/-/v1/search?text=${SecondPackage}`)
    .then(data =>{
      secondCellnpm.href=data.objects[0].package.links.npm
      secondCellhomepage.href=data.objects[0].package.links.homepage
      secondCellgithub.href=data.objects[0].package.links.repository
    })
  }


const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data
}
const data = {
      labels: [],
      datasets: [
        {
        label: "",
        data: "",
        borderColor: ['rgba(10, 27, 68, 1)',],
        backgroundColor: ['rgba(10, 27, 68, 1)',],
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: "",
        data: "",
        borderColor: ['rgba(249, 105, 14, 1)',],
        backgroundColor: ['rgba(249, 105, 14, 1)',],
        tension: 0.4,
        pointRadius: 0
      }
      ]
      }

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Compare NPM packages'
          }
        }
      },
    };


    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
