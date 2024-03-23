import { Module } from '@nestjs/common';
import { BudgetsModule } from './budgets/budgets.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BudgetsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // This makes the ConfigModule global, so you don't need to import it in other modules
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Assuming you have MONGODB_URI in your .env file
        dbName: 'budget-app',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
