import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserGender } from 'src/shared/enum/user.enum';

@Schema({ timestamps: true, versionKey: false, strict: false })
export class UserEntity {
  @Prop({ required: true, unique: true, type: String, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, type: String, trim: true })
  firstName: string;

  @Prop({ required: true, type: String, trim: true })
  lastName: string;

  @Prop({ required: true, type: String, trim: true, unique: true })
  username: string;

  @Prop({ required: true, type: String, trim: true, enum: UserGender })
  gender: UserGender;

  @Prop({ required: false, type: String, trim: true })
  avatar?: string;

  @Prop({ required: true, type: String, trim: true })
  password: string;

  @Prop({ required: false, type: String, trim: true })
  fullName: string;

  @Prop({ required: false, type: String, trim: true })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

// auto generate id
UserSchema.pre('save', function (next) {
  if (this.isNew) this.id = this?._id?.toString();
  next();
});

// auto generate fullName
UserSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});
