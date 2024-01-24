import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { FindAllQuery } from './dtos/find-all.dto';
import { CAT_DB } from './cat.db';
import { UpdateOneBody } from './dtos/update-one.dto';
import { Cat } from './cat.entity';
import { CreateOneBody } from './dtos/create-one.dto';

@Controller('/cat')
export class CatController {
  constructor() {}

  @TypedRoute.Get()
  findAll(@TypedQuery() query: FindAllQuery) {
    const { age } = query;
    if (age) {
      const cats = CAT_DB.filter((cat) => age === cat.age);
      return { data: { cats: cats } };
    }
    const cats = CAT_DB;
    return {
      data: { cats },
    };
  }

  @TypedRoute.Get('/:id')
  findOne(@TypedParam('id') id: string) {
    const cat = CAT_DB.find((cat) => cat.id === id);
    if (!cat) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: { cat: cat },
    };
  }

  @Post()
  createOne(@Body() body: CreateOneBody) {
    console.log(body);
    const id = '018d3d15-8dc7-77ed-93ef-76cf42a291c9';
    const cat: Cat = {
      id,
      ...body,
    };
    return {
      data: { cat: cat },
    };
  }

  // @TypedRoute.Post()
  // createOne(@TypedBody() body: CreateOneBody) {
  //   const id = '018d3d15-8dc7-77ed-93ef-76cf42a291c9';
  //   const cat: Cat = {
  //     id,
  //     ...body,
  //   };
  //   return {
  //     data: { cat: cat },
  //   };
  // }

  @TypedRoute.Patch('/:id')
  updateOne(@TypedBody() body: UpdateOneBody, @TypedParam('id') id: string) {
    const cat: Cat = {
      id,
      age: 3,
      ...body,
    };
    return {
      data: { cat: cat },
    };
  }

  @TypedRoute.Delete('/:id')
  removeOne(@TypedParam('id') id: string) {
    return {
      data: {},
    };
  }
}
