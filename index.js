const { Group, Student, Post } = require('./db/models');
const { Op } = require('sequelize');

// sequelize
//   .query('SELECT * FROM "Students";')
//   .then(([res]) => console.log(res))
//   .catch(console.log);

async function run() {
  // await Group.create({ name: 'Лисы', year: 2024 });
  // await Group.create({ name: 'Волки', year: 2024 });

  // await Student.bulkCreate([
  //   { name: 'Вася', groupId: 1, git: 'https://github.com/vasya' },
  //   { name: 'Петя', groupId: 1, git: 'https://github.com/petya' },
  //   { name: 'Коля', groupId: 2, git: 'https://github.com/kolya' },
  // ]);

  // const groups = await Group.findAll();
  // const students = await Student.findAll();
  // console.log(JSON.parse(JSON.stringify({ groups, students })));
  // console.log(JSON.parse(JSON.stringify(groups)));
  // console.log(groups.map((g) => g.get()));

  const foxes2024 = await Group.findOne({
    where: { name: 'Лисы', year: 2024 },
    include: Student,
  });
  // const foxes2024Students = await Student.findAll({
  //   include: {
  //     model: Group,
  //     where: { name: 'Лисы', year: 2024 },
  //     required: true,
  //   },
  // });
  // const foxes2024Students = await Student.findAll({
  //   where: { groupId: foxes2024.id },
  // });
  // console.log(foxes2024.get());
  // const foxes2024Students = await Student.findAll({
  //   include: [
  //     {
  //       model: Group,
  //       where: { name: 'Лисы', year: 2024 },
  //       required: true,
  //     },
  //     Post,
  //   ],
  // });

  // const targetPost = await Post.findOne({
  //   where: { id: 1 },
  //   include: {
  //     model: Student,
  //     include: {
  //       model: Group,
  //     },
  //   },
  // });
  await Student.destroy({
    where: {
      groupId: foxes2024.id,
      id: {
        [Op.gt]: 4,
      },
    },
  });
  const foxesStudents = await Student.findAll({
    where: { groupId: foxes2024.id },
  });
  console.log(foxesStudents.map((f) => f.get()));
  // console.log(JSON.stringify(targetPost, null, 2));
  // console.log(targetPost.Student.Group.name);
  // console.log(foxes2024Students.map((s) => s.get()));
}

run();
