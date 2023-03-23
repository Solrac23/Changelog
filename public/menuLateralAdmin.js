const $menuLateral = $('.menuLateral');
$(document).mouseup(e => {
    if(!$menuLateral.is(e.target) && $menuLateral.has(e.target).length === 0){
        $menuLateral.removeClass('mostra')
    }
}); 

$('.warehouse').click(function(){
    $('.menuLateral ul .itensWarehouse').toggleClass('mostra');
    $('.menuLateral ul .setaWarehouse').toggleClass('gira');
});

$('.project').click(function(){
    $('.menuLateral ul .itensProject').toggleClass('mostra');
    $('.menuLateral ul .setaProject').toggleClass('gira');
});

$('.po').click(function(){
    $('.menuLateral ul .itensPO').toggleClass('mostra');
    $('.menuLateral ul .setaPO').toggleClass('gira');
});

$('.stage').click(function(){
    $('.menuLateral ul .itensStage').toggleClass('mostra');
    $('.menuLateral ul .setaStage').toggleClass('gira');
});

$('.um').click(function(){
    $('.menuLateral ul .itensUM').toggleClass('mostra');
    $('.menuLateral ul .setaUM').toggleClass('gira');
});

$('.material').click(function(){
    $('.menuLateral ul .itensMaterial').toggleClass('mostra');
    $('.menuLateral ul .setaMaterial').toggleClass('gira');
});

$('.category').click(function(){
    $('.menuLateral ul .itensCategory').toggleClass('mostra');
    $('.menuLateral ul .setaCategory').toggleClass('gira');
});

$('.vendor').click(function(){
    $('.menuLateral ul .itensVendor').toggleClass('mostra');
    $('.menuLateral ul .setaVendor').toggleClass('gira');
});

$('.driver').click(function(){
    $('.menuLateral ul .itensDriver').toggleClass('mostra');
    $('.menuLateral ul .setaDriver').toggleClass('gira');
});

$('.user').click(function(){
    $('.menuLateral ul .itensUser').toggleClass('mostra');
    $('.menuLateral ul .setaUser').toggleClass('gira');
});

$('.btnAbre').click(function(){
    $('.menuLateral').toggleClass('mostra');
});

$('.btnFecha').click(function(){
    $('.menuLateral').toggleClass('mostra');
});

/*----FUNÇÕES QUE MOVIMENTAM A SETINHA QUANDO O MOUSE PASSA POR CIMA------*/
/*$('.warehouse').mouseover(function(){
    $('.menuLateral ul .setaWarehouse').toggleClass('gira');
});

$('.warehouse').mouseout(function(){
    $('.menuLateral ul .setaWarehouse').toggleClass('gira');
});

$('.project').mouseover(function(){
    $('.menuLateral ul .setaProject').toggleClass('gira');
});

$('.project').mouseout(function(){
    $('.menuLateral ul .setaProject').toggleClass('gira');
});

$('.po').mouseover(function(){
    $('.menuLateral ul .setaPO').toggleClass('gira');
});

$('.po').mouseout(function(){
    $('.menuLateral ul .setaPO').toggleClass('gira');
});

$('.stage').mouseover(function(){
    $('.menuLateral ul .setaStage').toggleClass('gira');
});

$('.stage').mouseout(function(){
    $('.menuLateral ul .setaStage').toggleClass('gira');
});

$('.um').mouseover(function(){
    $('.menuLateral ul .setaUM').toggleClass('gira');
});

$('.um').mouseout(function(){
    $('.menuLateral ul .setaUM').toggleClass('gira');
});

$('.material').mouseover(function(){
    $('.menuLateral ul .setaMaterial').toggleClass('gira');
});

$('.material').mouseout(function(){
    $('.menuLateral ul .setaMaterial').toggleClass('gira');
});

$('.category').mouseover(function(){
    $('.menuLateral ul .setaCategory').toggleClass('gira');
});

$('.category').mouseout(function(){
    $('.menuLateral ul .setaCategory').toggleClass('gira');
});

$('.vendor').mouseover(function(){
    $('.menuLateral ul .setaVendor').toggleClass('gira');
});

$('.vendor').mouseout(function(){
    $('.menuLateral ul .setaVendor').toggleClass('gira');
});

$('.driver').mouseover(function(){
    $('.menuLateral ul .setaDriver').toggleClass('gira');
});

$('.driver').mouseout(function(){
    $('.menuLateral ul .setaDriver').toggleClass('gira');
});

$('.user').mouseover(function(){
    $('.menuLateral ul .setaUser').toggleClass('gira');
});

$('.user').mouseout(function(){
    $('.menuLateral ul .setaUser').toggleClass('gira');
});*/