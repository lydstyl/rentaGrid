/* Global variables */
var g = globalVars = {
    price: '',
    works: '',
    notary: '',
    cost: '',
    rent: '',
    parseInt: function(inputName){
        g[inputName] = document.getElementById(inputName).value;
        g[inputName] == "" ? g[inputName] = 0 : g[inputName] = parseInt(g[inputName], 10);
    },
    init: function () {
        g.parseInt('price');
        g.parseInt('works');
        g.parseInt('notary');
        g.parseInt('cost');
        g.parseInt('rent');
        g.profitability = document.getElementById('profitability').value;
        g.profitability == "" ? g.profitability = 0 : g.profitability = parseFloat(g.profitability);
    },
    writeDomValue: function(inputName, value){
        document.getElementById(inputName).value = value;
    }
};
var inputs = document.querySelectorAll('input').forEach(function (element) {
    element.addEventListener('change', function(event){
        g.init();
    });
});

/* EventLIsteners */
document.querySelector('#addGrid').addEventListener("click", function addGrid(){
    var rentalBuilding = Object.create(immovable);
    rentalBuilding.init();
    rentalBuilding.costToRent();
});
document.querySelector('#clear').addEventListener("click", function clear(){
    document.querySelector('.grid').innerHTML = "";
});
document.querySelectorAll('.costDetail input').forEach(function(element) {
    element.addEventListener("keyup", function(){
        g.init();
        g[this.id] = this.value == "" ? 0 : parseInt(this.value, 10);
        g.writeDomValue('cost', g.price + g.works + g.notary);
    });
});
document.querySelectorAll('input').forEach(function(element){
    element.addEventListener('change', function(event){
        function watchProperty(obj, name, handler) {
            if ('watch' in obj) {
                obj.watch(name, handler);
            } else if ('onpropertychange' in obj) {
                name= name.toLowerCase();
                obj.onpropertychange= function() {
                    if (window.event.propertyName.toLowerCase()===name)
                        handler.call(obj);
                };
            } else {
                var o= obj[name];
                setInterval(function() {
                    var n= obj[name];
                    if (o!==n) {
                        o= n;
                        handler.call(obj);
                    }
                }, 200);
            }
        }
        watchProperty(event.target, 'value', function() {
            g.init();
            g.profitability = (g.rent  / g.cost).toFixed(2);
            g.writeDomValue('profitability', g.profitability);

            event.target.style.background = '#AF504C';
            setTimeout(function(){
                event.target.style.background = 'white';
            }, 800);
        });

    });
});
document.getElementById('cost').addEventListener("blur", function(){
    if(g.price && g.works && g.notary){
        var totalDetail = g.price + g.works + g.notary;
        if(g.cost != totalDetail){
            var difference = totalDetail - g.cost;
            if(difference < 0){
                var difference = totalDetail - g.cost;
                g.works -= difference;
                setTimeout(function(){
                    g.works -= g.price + g.works + g.notary - g.cost;     
                    g.writeDomValue('works', g.works)
                }, 50);
            }else{
                g.cost += difference;
                g.writeDomValue('cost', g.cost)
            }
        }
    }
    if(!g.works) g.writeDomValue('works', 0);
    if(!g.price){
        if(!g.notary){
            g.price = Math.round((g.cost - g.works) / 1.08);
            g.notary = Math.round(0.08 * g.price);
            g.writeDomValue('price',g.price);
            g.writeDomValue('notary',g.notary);
        }else{
            g.writeDomValue('price', g.cost - g.works - g.notary);
        }
    }else{
        g.notary = Math.round(0.08 * g.price);
        g.writeDomValue('notary',g.notary);
    }
});
document.getElementById('rent').addEventListener('change', function(event){
    document.getElementById('monthRent').value = Math.round(this.value / 12);
});
document.getElementById('monthRent').addEventListener('keyup', function(event){
    g.rent = this.value * 12;
    document.getElementById('rent').value = g.rent;
});

/* Immovable object */
var immovable = {
    init:function(){
        this.cost = document.querySelector('#cost').value == "" ? 0 : parseInt(document.querySelector('#cost').value, 10);
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
        if(this.cost == 0){
            alert("Please fill in the cost input and try again.")
            return;
        }
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
            innerHTML += '<tr ' + style + '><td>' + this.cost + ' ( price = ' + (this.cost - g.works - g.notary) + ' )</td>' + '<td>' + this.get('monthlyRent') + '</td>' + '<td>' + this.get('rent') + '</td>' + '<td>' + this.profitability + '</td></tr>';
        }
        table.innerHTML = innerHTML;
        grid.appendChild(table);
    },
    rentToCost : function (profitability, maxRent){
        alert('toDo');
    }
}

/* Init */
g.init();