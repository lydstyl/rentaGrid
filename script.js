var immovable = {
/*     init:function(price, works, notary, rent, profitability, cost){
        price === undefined ? this.price = 0 : this.price = parseInt(price, 10);
        works === undefined ? this.works = 0 : this.works = parseInt(works, 10);
        notary === undefined ? this.notary = 0 : this.notary = parseInt(notary, 10);
        cost === undefined || !cost ? this.cost = this.get('cost') : this.cost = parseInt(cost, 10);
        rent === undefined ? this.rent = 0 : this.rent = parseInt(rent, 10);
        profitability === undefined ? this.profitability = 0 : this.profitability = parseFloat(profitability);
    }, */
    init:function(){
        this.cost = parseInt(document.querySelector('#cost').value, 10);
        this.rent = parseInt(document.querySelector('#rent').value, 10);
        this.profitability = parseFloat(document.querySelector('#profitability').value);
    },
    get: function (wantedStr){
        var response;
        switch (wantedStr) {
            case 'cost':
                !this.cost || this.cost === undefined ? response = this.cost = this.price + this.works + this.notary : response = this.cost;
                var cost = document.getElementById('cost').value = this.cost;
                break; 
            case 'profitability':
                if(this.profitability === undefined || this.profitability === 0){
                    response = this.profitability = (this.rent / this.cost).toFixed(2);
                } else{
                    response = this.profitability;
                }
                break; 
            case 'rent':
                response = this.rent= Math.round(this.profitability * this.cost);
                break; 
            case 'monthlyRent':
                response = this.monthlyRent = Math.round((this.profitability * this.cost) / 12);
                break; 
            case 'price':
                response = this.price = this.get('cost') - this.works - this.notary;
                break; 
            default: 
                response = 'Unknowned wantedStr';
        } 
        return response;
    },
    costToRent : function (){
        var middleTableCost = this.cost
        var maxTableCost = this.cost * 1.1;
        this.cost = 0.9 * this.cost - 1000;
        var table = document.createElement('table');
        var innerHTML = '<tr><th>Cost</th><th>MR</th><th>AR</th><th>GP</th></tr>';
        var grid = document.querySelector('.grid');
        var style = '';
        while(this.cost < maxTableCost){
            this.cost += 1000;
            this.cost > middleTableCost ? style = "style='color:#AF504C'" : style = "style='color:#4CAF50'";
            innerHTML += '<tr ' + style + '><td>' + this.cost + '</td>' + '<td>' + this.get('monthlyRent') + '</td>' + '<td>' + this.get('rent') + '</td>' + '<td>' + this.profitability + '</td></tr>';
        }
        table.innerHTML = innerHTML;
        grid.appendChild(table);
    },
    rentToCost : function (profitability, maxRent){
        this.profitability = profitability;
        this.rent = 0.9 * maxRent - 100;
        var maxTableRent = maxRent * 1.1;
        var table = document.createElement('table');
        var innerHTML = '<tr><th>Cost</th><th>MR</th><th>AR</th><th>GP</th></tr>';
        var grid = document.querySelector('.grid');
        var style = '';
        while(this.cost < maxTableRent){
            this.cost += 100;
            this.cost > maxRent ? style = "style='color:#AF504C'" : style = "style='color:#4CAF50'";
            innerHTML += '<tr ' + style + '><td>' + this.cost + '</td>' + '<td>' + this.get('monthlyRent') + '</td>' + '<td>' + this.get('rent') + '</td>' + '<td>' + this.get('profitability') + '</td></tr>';
        }
        table.innerHTML = innerHTML;
        grid.appendChild(table);
    }
}
function addGrid(){
   /*  var price = document.getElementById('price').value,
    works = document.getElementById('works').value,
    notary = document.getElementById('notary').value,
    rent = document.getElementById('rent').value,
    profitability = document.getElementById('profitability').value,
    cost = document.getElementById('cost').value; */

    var immeubleLocatif = Object.create(immovable);
    immeubleLocatif.init();
    // immeubleLocatif.costToRent(profitability, cost);
    immeubleLocatif.costToRent();
}
function clear(){
    var thegrid = document.querySelector('.grid');
    thegrid.innerHTML = "";
}
var addGridButton = document.querySelector('#addGrid');
addGridButton.addEventListener("click", addGrid, false); 
var clearButton = document.querySelector('#clear');
clearButton.addEventListener("click", clear, false);

function costCalcul(){
    var price = parseInt(document.getElementById('price').value, 10),
    works = parseInt(document.getElementById('works').value, 10),
    notary = parseInt(document.getElementById('notary').value, 10),
    cost = document.getElementById('cost');
    cost.value = price + works + notary
    cost.style.color = '#AF504C';
    setTimeout(function(){
        cost.style.color = 'black';
    }, 800);
}
var costDetailInputs = document.querySelectorAll('.costDetail input');
costDetailInputs.forEach(function(element) {
    element.addEventListener("keyup", function(){
        costCalcul();
    });
});
