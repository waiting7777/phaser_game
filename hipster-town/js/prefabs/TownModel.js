var HTown = HTown || {}

HTown.TownModel = function(coefs, initialStats, building){

    this.coefs = {}
    this.coefs.populationGrowth = this.coefs.populationGrowth || 1.02

    this.stats = {}
    this.stats.population = initialStats.population
    this.stats.food = initialStats.food
    this.stats.money = initialStats.money

}

HTown.TownModel.prototype.step = function(){

    this.updateBuildingProduction()

    this.stats.population = this.stats.population * this.coef.populationGrowth

    this.stats.population = Math.min(this.stats.population, this.stats.housing)
}

HTown.TownModel.prototype.updateBuildingProduction = function(){
    this.stats.housing = 0

    this.buildings.forEach(function(building){
        if(building.housing){
            this.stats.housing += building.housing
        }
    }, this)
}