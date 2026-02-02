import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false, strict: false })
export class BlogEntity {
  @Prop({ required: true, type: String, trim: true })
  title: string;

  @Prop({ required: true, type: String, trim: true })
  body: string;

  @Prop({ required: false, type: String, trim: true })
  image: string;

  @Prop({ required: false, type: String, trim: true })
  author: string;

  @Prop({ required: false, type: String, trim: true })
  id: string;
}

export const BlogSchema = SchemaFactory.createForClass(BlogEntity);

// auto generate id
BlogSchema.pre('save', function (next) {
  if (this.isNew) this.id = this?._id?.toString();
  next();
});
