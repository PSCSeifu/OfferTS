module Bargain {
    export class Offer {
        public _id: number;
        public _name: string;
        public _productName: string;
        public _price: number;
        public _status: string; //online/sold
        public _acceptPrice: number;
        public _ttl: number;
        public _ttlDate: Date;

        constructor(public Id: number,
            public Name: string,
            public ProductName: string,
            public Price: number,
            public Status: string,
            public AcceptPrice: number,
            public TTL: number) {
            this._id = Id;
            this._name = Name;
            this._productName = ProductName;
            this._price = Price;
            this._status = Status;
            this._acceptPrice = AcceptPrice;
            this._ttl = TTL;

        }

        publishOffer() {
            //set ttldate

            var activeValue = "[$NAME$ | $PR$ | $TTL$ | $SOLD$]";

            var result = activeValue
                .replace('$NAME$', this._productName)
                .replace("$PR$", this._price.toString())
                .replace('$TTL$', "06:00:55")
                .replace('$SOLD$', this._status.toString());

            var htmlout = this.publishOfferBlock(result, "offerdisplay");
        }

        publishOfferBlock(htmlContent: string, className: string) {
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

    }


    export class Bargain {
        public _id: number;
        public _offerId: number;
        public _price: number;
        public _bargainBy: string; //vendor, customer
        public _status: string; //accept, continue

        constructor(public Id: number, public offerId: number, public price: number,
            public bargainBy: string, public status: string) {
            this._id = Id;
            this._offerId = offerId;
            this._price = price;
            this._bargainBy = bargainBy;
            this._status = status;
        }


        publishBargain() {
            //set ttldate
            var className = "";
            if (this._bargainBy == "vendor") {
                className = "customerdisplay";
            }
            else {
                className = "vendordisplay";
            }
                
            var activeValue = "[$PR$ | $TTL$ | $STATUS$]";

            var result = activeValue                
                .replace("$PR$", this._price.toString())
                .replace('$TTL$', "06:00:55")
                .replace('$STATUS$', this._status.toString());

            var htmlout = this.publishhBargainBlock(result, className);
        }

        publishhBargainBlock(htmlContent: string, className: string) {
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

        bargain(inputPrice: number, prevBargain: Bargain, offer: Offer ) {
            if (this._bargainBy == "vendor") {
                return this.vendorBargain(inputPrice, prevBargain, offer);
            }
            else {
                return this.customerBargain(inputPrice, prevBargain, offer); 
            }
        }

        vendorBargain(inputPrice: number, prevBargain: Bargain, offer: Offer) {

        }

        customerBargain(inputPrice: number, prevBargain: Bargain, offer: Offer) {
            //evaluate  prevOffer for 1. status 
            if (offer._status == "sold")
            {
                //Done
                return new Bargain(this._id, this._offerId, 0, "customer", "accept");
            }
            else {
                //Evaluate bargain

            }

        }
    }
}