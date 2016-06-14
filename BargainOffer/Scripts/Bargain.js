var CPM;
(function (CPM) {
    var Random = (function () {
        function Random() {
        }
        Random.prototype.getNumber = function (scale) {
            var sign = 1;
            if (Math.random() > 0.65) {
                sign = -1;
            }
            return (Math.random() * scale * sign);
        };
        Random.prototype.getfracton = function () { return Math.random(); };
        return Random;
    }());
    CPM.Random = Random;
    var Offer = (function () {
        function Offer(id, product, price, expiryDate, acceptRatio) {
            this.id = id;
            this.product = product;
            this.price = price;
            this.expiryDate = expiryDate;
            this.acceptRatio = acceptRatio;
            this._id = id;
            this._product = product;
            this._price = price;
            this._expiryDate = expiryDate;
            this._acceptablePrice = acceptRatio;
        }
        Offer.prototype.publish = function (name, price, className) {
            this._sold = false;
            var activeValue = "[$NAME$ | $PR$ | $TTL$ | $SOLD$]";
            var result = activeValue
                .replace('$NAME$', this._product)
                .replace("$PR$", this._price.toString())
                .replace('$TTL$', "time")
                .replace('$SOLD$', this._sold.toString());
            var htmlout = this.publishBlock(result, className);
        };
        Offer.prototype.publishBlock = function (htmlContent, className) {
            var node = document.createElement("div");
            //console.log("className:>" + className);
            node.className = className;
            //console.log("node:>" + node);
            var textnode = document.createTextNode(htmlContent);
            node.appendChild(textnode);
            var disparea = document.getElementById("display").appendChild(node);
            //console.log("disparea:> " + disparea);
            return disparea;
        };
        Offer.prototype.showSaleBanner = function () {
            var html = "ITEM HAS BEEN SOLD!";
        };
        Offer.prototype.Bargain = function (offer, type, bargainPrice) {
            if (type == "customer" && this._sold === false) {
                console.log("it is a customer");
                return this.customerBargain(offer, bargainPrice);
            }
            if (type == "vendor" && this._sold === false) {
                console.log("It is a Vendor");
                return this.vendorBargain(offer, bargainPrice);
            }
        };
        Offer.prototype.customerBargain = function (offer, customerBargain) {
            //var rand = new Random();
            if (offer._sold == false) {
                //bargain for a lower price
                //this._price = (0.75 * offer.rice) + (0.20 * offer.price * rand.getfracton());
                console.log("customerBargain:>" + customerBargain);
                this._price = customerBargain;
                console.log("this._price:>" + this._price);
            }
            else {
                console.log("CUSTOMER SEES ITEM IS SOLD");
                this._sold = true;
            }
            //this._expiryDate = 
            return this;
        };
        Offer.prototype.vendorBargain = function (offer, customerBargain) {
            console.log(offer.price <= this._price);
            if (offer.price <= this._price) {
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
                }
                else {
                    //bargain for a higher price                    
                    this._price = customerBargain * 1.08;
                    console.log("Vendor ups price : " + this._price);
                }
            }
            return this;
        };
        return Offer;
    }());
    CPM.Offer = Offer;
    var Bargain = (function () {
        function Bargain() {
        }
        return Bargain;
    }());
    CPM.Bargain = Bargain;
})(CPM || (CPM = {}));
//# sourceMappingURL=Bargain.js.map