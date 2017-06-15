var roleTransporter = {

	run: function(creep) {

		if(creep.ticksToLive > 20) {

			var container = [];
			container[0] = Game.getObjectById('5fcee8acd117057');
			container[1] = Game.getObjectById('432702e85bdc486');

			var containerNumber = 0;
			if (creep.name == 'T1') {
				containerNumber = 0;
			} 
			else if (creep.name == 'T2') {
				containerNumber = 1;
			}

			if (creep.memory.working && creep.carry.energy == 0) creep.memory.working = false;
			if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = true;

			if (creep.memory.working) {
				if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.storage);
				}
				else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == OK) {
					var carryParts = 0;
                    var EnergyCarried = 0;
                    for (i=0; i<creep.body.length; i++) {
                        if (creep.body[i].type == 'carry') {
                            carryParts = carryParts + 1;
                        }
                    }
                    EnergyCarried = 50*carryParts;
					Memory.energyProduced = Memory.energyProduced + EnergyCarried;
					Memory.energyProducedByMiners = Memory.energyProducedByMiners + EnergyCarried;
				}
			}
			else {
				if (creep.withdraw(container[containerNumber], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(container[containerNumber]);
				}
			}
		}
		else {
			var energyLeft = creep.carry.energy;
			if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.storage);
			}
			else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == OK) {
                Memory.energyProduced = Memory.energyProduced + energyLeft;
                Memory.energyProducedByMiners = Memory.energyProducedByMiners + energyLeft;

            }
		}
	}
};

module.exports = roleTransporter;

