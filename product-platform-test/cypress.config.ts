import { defineConfig } from 'cypress';
import reporterUtils from './reporterUtils';
import sdmUsers from './cypress/test_data/users/admUsers';
import platformUsers from './cypress/test_data/users/platformUsers/sync';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eslint-disable-next-line
      require('@cypress/grep/src/plugin')(config);

      on('before:run', () => {
        reporterUtils.cleanUpResultsTempDir();
      });

      on('after:run', async () => {
        await reporterUtils.mergeJunitResults();
        reporterUtils.mergeMochawesomeJsonReportsAndGenerateHTMLReport();
      });

      config.env.TEST_ENV = config.env.TEST_ENV ? config.env.TEST_ENV.toLocaleLowerCase() : 'dev';

      if (config.env.AUTH === 'SDM') {
        switch (config.env.TEST_ENV) {
          case 'prod':
            config.baseUrl = 'https://media.sch.com';
            config.env.R4R_TEACHER_URL = 'https://teacher.abc.sch.com';
            config.env.R4R_STUDENT_URL = 'https://student.abc.sch.com';
            break;
          default:
            config.baseUrl = `https://media-${config.env.TEST_ENV}.sch.com`;
            config.env.R4R_TEACHER_URL = `https://teacher.${config.env.TEST_ENV}.abc.sch.com`;
            config.env.R4R_STUDENT_URL = `https://student.${config.env.TEST_ENV}.abc.sch.com`;
            break;
        }
        config.env.USERS = sdmUsers[config.env.TEST_ENV as Env];
      } else {
        switch (config.env.TEST_ENV) {
          case 'prod':
            config.baseUrl = 'https://abc-platform.sch.com';
            config.env.R4R_TEACHER_URL =
              'https://teacher-plat.abc.sch.com';
            config.env.R4R_STUDENT_URL =
              'https://student-plat.abc.sch.com';
            break;
          default:
            config.baseUrl = `https://abc-platform-${config.env.TEST_ENV}.sch.com`;
            config.env.R4R_TEACHER_HUB_URL = `https://teacher-plat.${config.env.TEST_ENV}.abc.sch.com`;
            config.env.R4R_STUDENT_HUB_URL = `https://student-plat.${config.env.TEST_ENV}.abc.sch.com`;
            break;
        }
        config.env.USERS = platformUsers[config.env.TEST_ENV as Env];
      }

      return config;
    },
  },
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: false,
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporter, mochawesome',
    mochaJunitReporterReporterOptions: {
      mochaFile: `${reporterUtils.junitTempReportDirAbsolutePath}/test-output-[hash].xml`,
    },
    mochawesomeReporterOptions: {
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportDir: reporterUtils.mochawesomeTempReportDirAbsolutePath,
      reportFilename: '[name]-report',
    },
  },
  video: false,
  chromeWebSecurity: false,
  experimentalWebKitSupport: true,
  experimentalModifyObstructiveThirdPartyCode: true,
});
