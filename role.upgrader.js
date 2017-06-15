var roleUpgrader = {

    run: function(creep) {

	    if (creep.memory.working && creep.carry.energy == 0) creep.memory.working = false;
	    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = true;

        if(creep.ticksToLive > 20) {
    	    if(creep.memory.working) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage); 
                }
                else if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == OK) {
                    var carryParts = 0;
                    var EnergyCarried = 0;
                    for (i=0; i<creep.body.length; i++) {
                        if (creep.body[i].type == 'carry') {
                            carryParts = carryParts + 1;
                        }
                    }
                    EnergyCarried = 50*carryParts;
                    //console.log(creep.name + ' - EC: ' + EnergyCarried);
                    Memory.energyConsumed = Memory.energyConsumed + EnergyCarried;
                    Memory.energyConsumedByUpgraders = Memory.energyConsumedByUpgraders + EnergyCarried;
                }
            }
        }
        else {
            var energyLeft = creep.carry.energy;
            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
            }
            else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == OK) {
                Memory.energyConsumed = Memory.energyConsumed - energyLeft;
                Memory.energyConsumedByUpgraders = Memory.energyConsumedByUpgraders - energyLeft;
            }
        }
	}
};

module.exports = roleUpgrader;
