const { Plane, Passenger, Flight } = require('./db/models');

async function run() {
  //   const passengers = await Passenger.findAll();
  //   console.log(passengers.map((p) => p.toJSON()));
  //   const planes = await Plane.findAll();
  //   console.log(planes.map((p) => p.get()));
  //   const targetPassenger = await Passenger.findOne({
  //     where: {
  //       name: 'Петр Петров',
  //     },
  //     include: {
  //       model: Flight,
  //       include: {
  //         model: Plane,
  //       },
  //     },
  //   });
  //   console.dir(
  //     targetPassenger.toJSON().Flights.map((flight) => flight.Plane.model),
  //     { depth: null },
  //   );
  const targetPassenger = await Passenger.findOne({
    where: {
      name: 'Петр Петров',
    },
    // include: 'commentedOn',
    include: {
      model: Plane,
      as: 'planes',
    },
    // include: {
    //   model: Flight,
    //   include: Plane,
    // },
  });
  console.dir(targetPassenger.toJSON(), { depth: null });
  //   console.dir(
  //     targetPassenger.toJSON().Planes.map((plane) => plane.model),
  //     { depth: null },
  //   );

  //   const targetPassenger = await Passenger.findOne({
  //     where: {
  //       name: 'Петр Петров',
  //     },
  //     include: Flight,
  //   });
  //   const data = await Flight.findAll({
  //     where: {
  //       passengerId: 7,
  //     },
  //     include: Plane,
  //   });
  //   console.log(data.map((d) => d.toJSON()));
}

run();
