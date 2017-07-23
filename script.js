var immovable = {
    init:function(price, works, notary, rent, profitability, cost){
        price === undefined ? this.price = 0 : this.price = parseInt(price, 10);
        works === undefined ? this.works = 0 : this.works = parseInt(works, 10);
        notary === undefined ? this.notary = 0 : this.notary = parseInt(notary, 10);
        cost === undefined || !cost ? this.cost = this.get('cost') : this.cost = parseInt(cost, 10);
        rent === undefined ? this.rent = 0 : this.rent = parseInt(rent, 10);
        profitability === undefined ? this.profitability = 0 : this.profitability = parseFloat(profitability);
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
    costToRent : function (profitability, maxInvestment){
        this.profitability = profitability;
        this.cost = 0.8 * maxInvestment - 1000;
        var maxCostBeforeNego = maxInvestment * 1.2;
        var table = document.createElement('table');
        var innerHTML = '<tr><th>Cost</th><th>Monthly rent</th><th>Annual rent</th><th>gross_profitability</th></tr>';
        var grid = document.querySelector('.grid');
        while(this.cost < maxCostBeforeNego){
            this.cost += 1000;
            innerHTML += '<tr><td>' + this.cost + '</td>' + '<td>' + this.get('monthlyRent') + '</td>' + '<td>' + this.get('rent') + '</td>' + '<td>' + this.get('profitability') + '</td></tr>';

        }
        table.innerHTML = innerHTML;
        grid.appendChild(table);
    } 
}
function showGrid(){
    var price = document.getElementById('price').value,
    works = document.getElementById('works').value,
    notary = document.getElementById('notary').value,
    rent = document.getElementById('rent').value,
    profitability = document.getElementById('profitability').value,
    cost = document.getElementById('cost').value;
    var immeubleLocatif = Object.create(immovable);
    immeubleLocatif.init(price, works, notary, rent, profitability, cost);
    console.log(immeubleLocatif);
    // immeubleLocatif.costToRent(profitability, cost);
    // console.log(immeubleLocatif); 
}
var go = document.querySelector('button');
go.addEventListener("click", showGrid, false); 