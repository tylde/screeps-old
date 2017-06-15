var roleMiner = {

	run: function (creep) {
		
		var container = [];
		container[0] = Game.getObjectById('5fcee8acd117057');
		container[1] = Game.getObjectById('432702e85bdc486');

		var containerNumber = 0;
		if (creep.name == 'M1') {
			containerNumber = 0;
		}
		else if (creep.name == 'M2') {
			containerNumber = 1;
		}

		if (creep.pos.toString() == container[containerNumber].pos.toString()) {
			var source = creep.pos.findClosestByRange(FIND_SOURCES);
			creep.harvest(source);
		}
		else {
			creep.moveTo(container[containerNumber]);
		}
	}
};


module.exports = roleMiner;

