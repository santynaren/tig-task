import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { validateShortUrl } from './utils/url.helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  wrongLink() {
    return this.appService.handleWrongLink();
  }

  @Get(':shortURL')
  @Redirect('', 301)
  redirectToSourceLink(@Param('shortURL') shortURL: string) {
    if (validateShortUrl(shortURL)) {
      try {
        return this.appService.redirectToSourceLink(shortURL);
      } catch (e) {
        throw e;
      }
    } else {
      return this.appService.handleWrongLink();
    }
  }
}
