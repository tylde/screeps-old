var roleLDHarvester = {

	run: function(creep) {

		var homeRoom = '';
		var destRoom = '';
		var homeExitX = 0;
		var homeExitY = 0;
		var source;

		// 
		switch (creep.name) {
			case 'LDH1':
				homeRoom = 'W2N6';
				destRoom = 'W3N6';
				homeExitX = 1;
				homeExitY = 36;
				source = Game.getObjectById('67a5e83664eaa25');
				break;
			case 'LDH2':
				homeRoom = 'W2N6';
				destRoom = 'W3N6';
				homeExitX = 1;
				homeExitY = 14;
				source = Game.getObjectById('346be83664ec4d1');
				break;	
			case 'LDH3':
				homeRoom = 'W2N6';
				destRoom = 'W1N6';
				homeExitX = 49;
				homeExitY = 36;
				source = Game.getObjectById('24fce83cdd35bbd');
				break;
			case 'LDH4':
				homeRoom = 'W2N6';
				destRoom = 'W1N6';
				homeExitX = 49;
				homeExitY = 13;
				source = Game.getObjectById('2ef5e83cdd346e3');
				break;
			case 'LDH5':
				homeRoom = 'W2N6';
				destRoom = 'W3N5';
				homeExitX = 1;
				homeExitY = 36;
				source = Game.getObjectById('a735e8368438010');
				break;
		}


		
        if(creep.memory.working && creep.carry.energy == 0) creep.memory.working = false;
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = true;

        
		if(creep.memory.working) {
			if (creep.room.name == creep.memory.home) {
				// creep is in home room
	            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.room.storage);
				}
				else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == OK) {
					// if creep tranfered energy to storage add information to energy produced
					var carryParts = 0;
                    var EnergyCarried = 0;
                    for (i=0; i<creep.body.length; i++) {
                        if (creep.body[i].type == 'carry') {
                            carryParts = carryParts + 1;
                        }
                    }
                    EnergyCarried = 50*carryParts;
					Memory.energyProduced = Memory.energyProduced + EnergyCarried;
					Memory.energyProducedByLDHarvesters = Memory.energyProducedByLDHarvesters + EnergyCarried;
				}
			}
			else {
				var exit = creep.room.findExitTo(homeRoom);
		        creep.moveTo(creep.pos.findClosestByPath(exit));
			}
		}
		else {
			// creep is not in home room
			if (creep.room.name == destRoom) {
				// creep is in destination room
				if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
	        }
	        else {
	        	// creep is not in home and destination room 
	        	if (creep.room.name == homeRoom) {
		        	if (creep.pos.x != homeExitX && creep.pos.y != homeExitY) {
		        		creep.moveTo(homeExitX, homeExitY);
		        	}
		        	else {
		        		var exit = creep.room.findExitTo(destRoom);
			        	creep.moveTo(creep.pos.findClosestByPath(exit));
		        	}
	        	}
		        else {
		        	var exit = creep.room.findExitTo(destRoom);
		        	creep.moveTo(creep.pos.findClosestByPath(exit));
		        }
	        }
        }
	}
};



module.exports = roleLDHarvester;
