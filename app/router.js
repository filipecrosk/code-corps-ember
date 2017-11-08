import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      let page = document.location.pathname;
      let title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('about');

  this.route('admin', function() {
    this.route('github-events', { path: '/github/events' }, function() {
      this.route('github-event', { path: '/:id' });
    });
  });

  this.route('github', {
    path: '/oauth/github'
  });

  this.route('login');

  this.route('organization', function() {
    this.route('settings', function() { });
  });

  this.route('organizations', function() {
    this.route('slugged-route', {
      path: '/:slugged_route_slug'
    }, function() {
      this.route('settings', function() {
        this.route('profile');
      });
    });
  });

  this.route('privacy');

  this.route('project', { path: '/:slugged_route_slug/:project_slug' }, function() {
    this.route('checkout');
    this.route('donate');
    this.route('settings', function() {
      this.route('contributors');
      this.route('donations', function() {
        this.route('goals');
        this.route('payments');
      });
      this.route('integrations');
      this.route('profile');
    });
    this.route('tasks', function() {
      this.route('new');
      this.route('task', { path: '/:number' });
    });
    this.route('thank-you');
  });

  this.route('projects', {
    path: '/:slugged_route_slug/projects'
  });

  this.route('projects-list', {
    path: '/projects'
  });

  this.route('password', function() {
    this.route('reset');
    this.route('forgot');
  });

  this.route('settings', function() {
    this.route('profile');
    this.route('integrations');
  });

  this.route('signup');

  this.route('slugged-route', {
    path: '/:slugged_route_slug'
  });

  this.route('start', function() {
    this.route('hello');
    this.route('interests');
    this.route('expertise');
    this.route('skills');
  });

  this.route('team');
  this.route('terms');
});

export default Router;
