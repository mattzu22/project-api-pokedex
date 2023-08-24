export function showNavInfoPoke(){
    const menu = document.querySelectorAll(".menu li");
  
    menu.forEach(val => {
      val.addEventListener("click", ()=>{
        const infoAberto = document.querySelector(".aberto");
        infoAberto.classList.remove("aberto")
        
        const idMenu = val.id;
        const idList = document.getElementById(`info-${idMenu}`);
        idList.classList.add("aberto") 
        
        const selecionado = document.querySelector(".selecionado");
        selecionado.classList.remove("selecionado");
        
        val.classList.add("selecionado");
  
        const menuSelecionado = document.getElementById(idMenu);
        menuSelecionado.classList.add("selecionado")
  
      })
    });
  }
  