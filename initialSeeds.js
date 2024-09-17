const { Group, Post, Student } = require('./db/models');
const { readFile } = require('fs/promises');
const { fakerRU: faker } = require('@faker-js/faker');

async function seed() {
  const groupNames = ['Рыси', 'Еноты', 'Волки', 'Лисы', 'Орлы', 'Совы'];
  const groups = await Group.bulkCreate(
    groupNames
      .map((groupName) =>
        new Array(4).fill(null).map((_, i) => ({
          name: groupName,
          year: 2021 + i,
        })),
      )
      .flat(),
  );

  const foxes2024 = await readFile('./studentData.txt', 'utf-8');

  await Student.bulkCreate(
    foxes2024.split('\n').map((row) => ({
      name: row.split('\t')[0],
      git: row.split('\t')[1],
      groupId: groups.find((group) => group.name === 'Лисы' && group.year === 2024).id,
    })),
  );

  await Student.bulkCreate(
    new Array(100).fill(null).map(() => ({
      name: faker.person.fullName(),
      git: `https://github.com/${faker.internet.userName()}`,
      groupId: groups[Math.floor(Math.random() * groups.length)].id,
    })),
  );

  const students = await Student.findAll();

  await Post.bulkCreate(
    new Array(500).fill(null).map(() => ({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      studentId: students[Math.floor(Math.random() * students.length)].id,
    })),
  );
}

seed();
