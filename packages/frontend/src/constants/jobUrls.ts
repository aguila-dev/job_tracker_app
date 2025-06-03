const link = 'https://boards-api.greenhouse.io/v1/boards'
import { JobData } from '@/interface/IJobs'

import AIRBNB_LOGO from '../assets/logos/airbnb.svg'
console.log(AIRBNB_LOGO)

/**
 * Job backend URLs
 * @type {Array<{title: string, name: string, url: string, active: boolean}>}
 * title: The title of the company.
 * name: The name of the company, used for parameterizing the URL.
 * url: The URL to fetch job listings from (FRONTEND BASE PATH).
 * active: Whether the company is currently hiring or not.
 */

const jobBackends: JobData[] = [
  {
    title: 'RVO Health',
    name: 'rvohealth',
    url: `${link}/rvohealth/jobs`,
    active: true,
  },
  {
    title: 'Red Ventures',
    name: 'redventures',
    url: `${link}/redventures/jobs`,
    active: true,
  },
  {
    title: 'Airbnb',
    name: 'airbnb',
    url: `${link}/airbnb/jobs`,
    active: true,
    logo: AIRBNB_LOGO,
  },
  {
    title: 'Dropbox',
    name: 'dropbox',
    url: `${link}/dropbox/jobs`,
    active: true,
  },
  {
    title: 'Instacart',
    name: 'instacart',
    url: `${link}/instacart/jobs`,
    active: true,
  },
  {
    title: 'Stripe',
    name: 'stripe',
    url: `${link}/stripe/jobs`,
    active: true,
  },
  {
    title: 'Greenhouse',
    name: 'greenhouse',
    url: `${link}/greenhouse/jobs`,
    active: true,
  },
  {
    title: 'Reddit',
    name: 'reddit',
    url: `${link}/reddit/jobs`,
    active: true,
  },
  {
    title: 'Robinhood',
    name: 'robinhood',
    url: `${link}/robinhood/jobs`,
    active: true,
  },
  {
    title: 'Twitch',
    name: 'twitch',
    url: `${link}/twitch/jobs`,
    active: true,
  },
  {
    title: 'GoDaddy',
    name: 'godaddy',
    url: `${link}/godaddy/jobs`,
    active: true,
  },
  {
    title: 'NerdWallet',
    name: 'nerdwallet',
    url: `${link}/nerdwallet/jobs`,
    active: true,
  },
  {
    title: 'Pinterest',
    name: 'pinterest',
    url: `${link}/pinterest/jobs`,
    active: true,
  },
  {
    title: 'Wayfair',
    name: 'wayfair',
    url: `${link}/wayfair/jobs`,
    active: true,
  },
  {
    title: 'Learfield',
    name: 'learfield',
    url: `${link}/learfield/jobs`,
    active: true,
  },
  {
    title: 'Monumental Sports',
    name: 'monumentalsports',
    url: `${link}/monumentalsports/jobs`,
    active: true,
  },
  {
    title: 'Red Canary',
    name: 'redcanary',
    url: `${link}/redcanary/jobs`,
    active: false,
  },
  {
    title: 'Three Flow',
    name: 'threeflow',
    url: `${link}/threeflow/jobs`,
    active: true,
  },
  {
    title: 'GitLab',
    name: 'gitlab',
    url: `${link}/gitlab/jobs`,
    active: true,
  },
  {
    title: 'Figma',
    name: 'figma',
    url: `${link}/figma/jobs`,
    active: true,
  },
  {
    title: 'Voltron Data',
    name: 'voltrondata',
    url: `${link}/voltrondata/jobs`,
    active: true,
  },
  {
    title: 'Doximity',
    name: 'doximity',
    url: `${link}/doximity/jobs`,
    active: true,
  },
  {
    title: 'Agent Sync',
    name: 'agentsync',
    url: `${link}/agentsync/jobs`,
    active: true,
  },
  {
    title: 'Protagonist',
    name: 'protagonist',
    url: `${link}/protagonist/jobs`,
    active: true,
  },
  {
    title: 'Fearless',
    name: 'fearless',
    url: `${link}/fearless/jobs`,
    active: true,
  },
  {
    title: 'Parachute Health',
    name: 'parachutehealth',
    url: `${link}/parachutehealth/jobs`,
    active: true,
  },
  {
    title: 'Lyft',
    name: 'lyft',
    url: `${link}/lyft/jobs`,
    active: true,
  },
  {
    title: 'Okta',
    name: 'okta',
    url: `${link}/okta/jobs`,
    active: true,
  },
  {
    title: 'Warby Parker',
    name: 'warbyparker',
    url: `${link}/warbyparker/jobs`,
    active: true,
  },
  {
    title: 'Calm',
    name: 'calm',
    url: `${link}/calm/jobs`,
    active: true,
  },
  {
    title: 'Cruise',
    name: 'cruise',
    url: `${link}/cruise/jobs`,
    active: true,
  },
  {
    title: 'DoorDash',
    name: 'doordash',
    url: `${link}/doordash/jobs`,
    active: true,
  },
  {
    title: 'Gusto',
    name: 'gusto',
    url: `${link}/gusto/jobs`,
    active: true,
  },
  {
    title: 'Lattice',
    name: 'lattice',
    url: `${link}/lattice/jobs`,
    active: true,
  },
  {
    title: 'Fabric',
    name: 'fabric',
    url: `${link}/fabric83/jobs`,
    active: true,
  },
  {
    title: 'Cerebral',
    name: 'cerebral',
    url: `${link}/cerebral/jobs`,
    active: true,
  },
  {
    title: 'Snyk',
    name: 'snyk',
    url: `${link}/snyk/jobs`,
    active: true,
  },
  {
    title: 'Strava',
    name: 'strava',
    url: `${link}/strava/jobs`,
    active: true,
  },
  {
    title: 'Calendly',
    name: 'calendly',
    url: `${link}/calendly/jobs`,
    active: true,
  },
  {
    title: 'LinkedIn',
    name: 'linkedin',
    url: `${link}/linkedin/jobs`,
    active: true,
  },
  {
    title: 'Smartsheet',
    name: 'smartsheet',
    url: `${link}/smartsheet/jobs`,
    active: true,
  },
  {
    title: 'Exodus54',
    name: 'exodus54',
    url: `${link}/exodus54/jobs`,
    active: true,
  },
  {
    title: 'Zwift',
    name: 'zwift',
    url: `${link}/zwift/jobs`,
    active: true,
  },
]

jobBackends.sort((a, b) => a.title.localeCompare(b.title))

/**
 * Workday job URLs
 * @type {Array<{title: string, name: string, url: string}>}
 * title: The title of the company.
 * name: The name of the company, used for parameterizing the URL.
 * url: The URL to fetch job listings from (FRONTEND BASE PATH).
 */
export const workdayJobs: JobData[] = [
  {
    title: 'Booz Allen Hamilton',
    name: 'bah',
    url: 'https://bah.wd1.myworkdayjobs.com/BAH_Jobs',
  },
  {
    title: 'CACI International',
    name: 'caci',
    url: 'https://caci.wd1.myworkdayjobs.com/External',
  },
  {
    title: 'Accenture',
    name: 'accenture',
    url: 'https://accenture.wd3.myworkdayjobs.com/Accenture_Careers',
  },
  {
    title: 'Nvidia',
    name: 'nvidia',
    url: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite',
  },
  {
    title: 'Patagonia',
    name: 'patagonia',
    url: 'https://patagonia.wd5.myworkdayjobs.com/PWCareers',
  },
  {
    title: 'Georgetown University',
    name: 'georgetown',
    url: 'https://georgetown.wd1.myworkdayjobs.com/Georgetown_Admin_Careers',
  },
  {
    title: 'Travelers',
    name: 'travelers',
    url: 'https://travelers.wd5.myworkdayjobs.com/External',
  },
  {
    title: 'The Hartford',
    name: 'thehartford',
    url: 'https://thehartford.wd5.myworkdayjobs.com/Careers_External',
  },
  {
    title: 'Capital One',
    name: 'capitalone',
    url: 'https://capitalone.wd1.myworkdayjobs.com/Capital_One',
  },
]

workdayJobs.sort((a, b) => a.title.localeCompare(b.title))

export default jobBackends
