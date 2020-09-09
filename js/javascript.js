(function readyJS(win,doc){

    if(doc.querySelectorAll('.eliminar')){
        for (let i=0; i<doc.querySelectorAll('.eliminar').length; i++){
            doc.querySelectorAll('.eliminar')[i].addEventListener('click', function(){
                if(confirm("Deseja eliminar este usuario?")){
                    return true;
                }else{
                    event.preventDefault();
                }
            });
        }
    }
})(window,document);