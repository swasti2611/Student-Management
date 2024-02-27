let AZbtn = document.getElementById("sort-AZ");
let ZAbtn = document.getElementById("sort-ZA");
let marks= document.getElementById("sort-Marks")
let passing= document.getElementById("sort-passing")
let Class= document.getElementById("sort-class")
let gender= document.getElementById("sort-gender")
let inputSearch=document.getElementById("inputSearch");
let inputButton=document.getElementById("inputButton")
async function getData() {
    let res = await fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json");
    let data = await res.json();
    renderTable(data);
   
    AZbtn.addEventListener("click", () => {
        let sortedData = sortbyAtoZ(data);
        renderTable(sortedData);
    });
    ZAbtn.addEventListener("click",()=>{
        let sortedData = sortbyZtoA(data);
        renderTable(sortedData);
    })
    marks.addEventListener("click",()=>{
        let sortedData=sortByMarks(data);
        renderTable(sortedData)
    })
    passing.addEventListener("click",()=>{
        let sortedData=sortByPassing(data);
        renderTable(sortedData)
    })
    Class.addEventListener("click",()=>{
        let sortedData=sortByClass(data);
        renderTable(sortedData)
    })
    gender.addEventListener("click",()=>{
        
        sortByGender(data);
    })

    inputButton.addEventListener('click',()=>{
       
        searchByInput(data)
       
    })
   
}

function renderTable(data) {
    let table = document.getElementById('table');
    table.innerHTML = `
        <tr>
            <th>id</th>
            <th>Name</th>
            <th>gender</th>
            <th>class</th>
            <th>marks</th>
            <th>passing</th>
            <th>email</th>
        </tr>
    `;
    data.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
            </tr>
        `;
    });
}

const sortbyAtoZ = (data) => {
    return data.sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        if (fullNameA < fullNameB) return -1;
        if (fullNameA > fullNameB) return 1;
        return 0;
    });
};

const sortbyZtoA = (data) => {
    return data.sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        if (fullNameA < fullNameB) return 1;
        if (fullNameA > fullNameB) return -1;
        return 0;
    });
};

const sortByMarks=(data)=>{
    return data.sort((a,b)=>{
        let marks1=`${a.marks}`;
        let marks2=`${b.marks}`
        // if(marks1>marks2)return 1;
        // if(marks1<marks2)return -1;
        // return 0;
        return marks1-marks2
    })
}

const sortByPassing=(data)=>{
    return data.sort((a,b)=>{
        let pass1=`${a.passing}`;
        let pass2=`${b.passing}`
        if(pass1>pass2)return 1;
         if(pass1<pass2)return -1;
        return 0;
        
    })
}
const sortByClass=(data)=>{
    return data.sort((a,b)=>{
        let class1=`${a.class}`;
        let class2=`${b.class}`
        return class1-class2;
        
    })
}
const sortByGender=(data)=>{
  
        
    let Female=data.filter((curr)=>{
        return curr.gender==='Female'
    })
    let Male=data.filter((curr)=>{
        return curr.gender==='Male'
    })
    table.innerHTML = '';
    renderTable(Female);

    renderTable(Male);
}


function searchByInput(data)
{
let InputData=inputSearch.value.trim().toLowerCase();
const filteredData = data.filter(student => (
    student.first_name.toLowerCase().includes(InputData) ||
    student.last_name.toLowerCase().includes(InputData) ||
    student.email.toLowerCase().includes(InputData)
));

renderTable(filteredData);


}
    getData();