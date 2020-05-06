(function() { // isolamento para que o usuario nao consigo accesso aos variaveís pelo console,ele vai executar quando o navigador rodar e bloqueiar acesso inteno ao usuario

    const $ = q => document.querySelector(q); //dolar sign



    //Rendenizar
    function renderCorpo() { //7* 01
        const corpo = getCorpo();
        $("#corpo").innerHTML = ""; // fiz isso para dizer que ele vai começar vaziu,para nao fazer foreach novamente,para nao acrescentar de novo essa linha que eu quero excluir

        corpo.forEach(a => addAlunoToCorpo(a)) //7* 03 para adicionar cada aluno que entrar 

    }

    //Rendenizar

    // para colocar as informações no body

    function addAlunoToCorpo(aluno) { // 6* criando objeto row no body ,primeiro passo atravers manipulaçao de dom
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${aluno.name}</td>
        <td>${aluno.avaliacao1}</td>
        <td>${aluno.avaliacao2}</td>
        <td>${aluno.avaliacao3}</td>
        <td> ${new Date(aluno.time) // new date se usa para pegar o horario que o aluno fui cadastrado
         
          .toLocaleString("pt-BR",{
              hour:"numeric",minute:"numeric"
          })}</td>

        <td>
         <button style="background-color:rebeccapurple;color:white" class = "delete">Excluir<button>          
        
        </td>

        
        <button style="background-color:rebeccapurple;color:white" class = "Editar">Editar<button>   
  
        `


        ;
        $("#corpo").appendChild(row); // criando objeto row segundo passo,usamos para jogar as informaçoes do row no body
    };

    // fim para colocar as informações no body

    function checkOut(info) { // faz parte do processo de excluir 8* 02
        const name = info[0].textContent;
        const msg = `Deseja excluir  ${info[0].textContent} na lista ecolar?`
        if (!confirm(msg)) return;

        const corpo = getCorpo().filter(a => a.name !== name);
        localStorage.corpo = JSON.stringify(corpo);
        console.log(name, corpo);
        renderCorpo();
    }



    //function que faz parte também 7* 02 para rendenizar

    const getCorpo = () => localStorage.corpo ? JSON.parse(localStorage.corpo) : []; // 2* inicio do localstorage primeiro passo,a gente usa parse porque o localstorage entende só texto,ele nao entende objeto,agora ele ta como objeto,agora ele pegou as informações em texto,transformando em Json,é por isso a gente fez essa conversa


    //fim function que faz parte também para rendenizar

    renderCorpo(); // chamando a function de rendenizar 7* 04

    $("#send").addEventListener("click", e => { // 1* inicio para capturar os valores dos input
        const name = $("#name").value;
        const avaliacao1 = Number($("#avaliacao1").value);
        const avaliacao2 = Number($("#avaliacao2").value);
        const avaliacao3 = Number($("#avaliacao3").value);

        if (!name || !avaliacao1 || !avaliacao2 || !avaliacao3) { // 5* isso que dizer se os campos forem vaziu vai retornar os campos sao obrigatorios como mensagem
            alert("Os Campos são Obrigatorios")
                // return;
        } else {

            var aval = (avaliacao1 + avaliacao2 + avaliacao3) / 3


            alert(`A media da nota do ${name} é ${aval}, deseja guardar as informações do ${name}`)
        }


        const aluno = { name, avaliacao1, avaliacao2, avaliacao3, time: new Date() }


        const corpo = getCorpo(); // criando objeto row terceiro passo,aqui a gente chamou afunção para poder jogar as informaçoes no body no body
        corpo.push(aluno);

        localStorage.corpo = JSON.stringify(corpo); //3* local storage segundo passo,a gora neste passo,transformamos as informaçoes em objeto de novo para ser guardadas no localstorage
        console.log(corpo)

        addAlunoToCorpo(aluno);

        $("#name").value = ""; // 4* fazemos isso para limpar os inputs,mas se a gente clicar mais uma vez no butao,ia dar capos vaziu sem informaçoes para corrigir isso,a gente faz o passo 5* com if
        $("#avaliacao1").value = "";
        $("#avaliacao2").value = "";
        $("#avaliacao3").value = "";


    });
    // para excluir 

    $("#corpo").addEventListener("click", e => { // 8* 01
        if (e.target.className = "delete")
            checkOut(e.target.parentElement.parentElement.cells);

    })



    // Fim para excluir 


    // editar

    function editar(edita) { // faz parte do processo de excluir 8* 02
        const name = edita[3].textContent;
        const msg = `Deseja editar?  ${edita[3].textContent}`
        if (!confirm(msg)) return;

        const corpo = getCorpo().filter(a => a.name !== name);
        localStorage.corpo = JSON.stringify(corpo);
        console.log(name, corpo);
        renderCorpo();
    }


    $("#corpo").addEventListener("click", e => { // 
        if (e.target.className = "editar")
            editar(e.target.parentElement.parentElement.cells);

    })


    // editar


})();