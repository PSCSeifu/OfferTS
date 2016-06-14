module CPM {
    export class Random {

        getNumber(scale: number) {
            var sign = 1;
            if (Math.random() > 0.65) {
                sign = -1;
            }
            return (Math.random() * scale * sign);
        }
        public getfracton() { return Math.random(); }
    }

    export class Offer {
        public _id: number;
        public _sourceType: string;
        public _product: string;
        public _price: number;
        public _expiryDate: Date;
        public _sold: boolean;
        public _acceptablePrice: number;

        constructor(public id: number,
            public product: string,
            public price: number,
            public expiryDate: Date,
        public acceptRatio :number)
        {
            this._id = id;
            this._product = product;
            this._price = price;
            this._expiryDate = expiryDate;
            this._acceptablePrice = acceptRatio;
        }

        publish(name: string, price : number,className: string) {
            this._sold = false;
                        
            var activeValue = "[$NAME$ | $PR$ | $TTL$ | $SOLD$]";
           
            var result = activeValue
                .replace('$NAME$', this._product)
                .replace("$PR$", this._price.toFixed(2))
                .replace('$TTL$', "time")
                .replace('$SOLD$',this._sold.toString());          
                      
            var htmlout = this.publishBlock(result, className);

            
        }

        publishBlock(htmlContent: string, className: string ) {
            var node = document.createElement("div");
           
            //console.log("className:>" + className);
            node.className = className;            
            //console.log("node:>" + node);

            var textnode = document.createTextNode(htmlContent);            
            node.appendChild(textnode);


            var disparea = document.getElementById("display").appendChild(node);
            //console.log("disparea:> " + disparea);

            return disparea;
        }

        showSaleBanner() {
            var html = "ITEM HAS BEEN SOLD!";
        }
               

        Bargain(offer: Offer, type:string) {
            if (type == "customer" && this._sold === false) {
                console.log("it is a customer");
                return this.customerBargain(offer);                
            }

            if (type == "vendor" && this._sold === false) {
                console.log("It is a Vendor");
                return this.vendorBargain(offer);
            }
        }

        customerBargain(offer: Offer) {
            var rand = new Random();
            if (offer._sold == false) {            //bargain for a lower price
                this._price = (0.75 * offer.price) + (0.20 * offer.price * rand.getfracton());
            }


            //this._expiryDate = 

            return this;
        }

        vendorBargain(offer: Offer) {
            console.log(offer.price <= this._price);
            if (offer.price <= this._price)
            {
                //Accept offer
                offer._sold = true;
                console.log("vendor's offer :" + offer.price);
                console.log(" customer  price : " + this._price);
                console.log("Vendor accepting offer 1");
            }
            else {
                //if acceptablePrice reached,accept
                if ((this._price / offer.price) >= this._acceptablePrice) {
                    //Accept Offer
                    console.log("Vendor accepting offer: ratio = "
                        + (this._price / offer.price).toFixed(2)
                        + " accpetratio := " + this._acceptablePrice);
                    offer._sold = true;
                    this._sold = true;
                } else {

                    //bargain for a higher price                    
                    this._price = this._price + (this._price * 0.08);
                    console.log("Vendor ups price : " + this._price );
                }
            }

            return this;
        }

    }

    export class Bargain {
        public _sender: string;
        public _receiver: string;
        public _counterPrice: number;
        public _counterTtl: Date;

        


    }
}