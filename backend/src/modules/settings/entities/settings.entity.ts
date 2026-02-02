import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, strict: false })
export class SettingsEntity {
  @Prop({ required: true, type: String, trim: true })
  erpNextApiKey: string;

  @Prop({ required: true, type: String, trim: true })
  erpNextApiSecret: string;

  @Prop({ required: true, type: String, trim: true })
  hrmApiKey: string;

  @Prop({ required: true, type: String, trim: true })
  hrmApiSecret: string;

  @Prop({ required: true, type: String, trim: true })
  erpNextUrl: string;

  @Prop({ required: true, type: String, trim: true })
  hrmUrl: string;

  @Prop({ required: true, type: String, trim: true })
  erpNextLoginUrl: string;

  @Prop({ required: true, type: String, trim: true })
  hrmLoginUrl: string;

  @Prop({ required: false, type: String, trim: true })
  hrmSiteName: string;

  @Prop({ required: false, type: String, trim: true })
  erpNextSiteName: string;

  @Prop({ type: String })
  id: string;
}

export const SettingsSchema = SchemaFactory.createForClass(SettingsEntity);

// middleware
SettingsSchema.pre('save', function (next) {
  if (!this.id) this.id = this._id.toString();
  next();
});

export type SettingsDocument = HydratedDocument<SettingsEntity>;
