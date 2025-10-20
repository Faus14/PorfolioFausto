// Solo las skills que realmente se usan en el portfolio
import angular from '../app/assets/svg/skills/angular.svg';
import aws from '../app/assets/svg/skills/aws.svg';
import css from '../app/assets/svg/skills/css.svg';
import django from '../app/assets/svg/skills/django.svg';
import docker from '../app/assets/svg/skills/docker.svg';
import git from '../app/assets/svg/skills/git.svg';
import html from '../app/assets/svg/skills/html.svg';
import javascript from '../app/assets/svg/skills/javascript.svg';
import kubernetes from '../app/assets/svg/skills/kubernetes.svg';
import laravel from '../app/assets/svg/skills/laravel.svg';
import linux from '../app/assets/svg/skills/linux.svg';
import mysql from '../app/assets/svg/skills/mysql.svg';
import nginx from '../app/assets/svg/skills/nginx.svg';
import php from '../app/assets/svg/skills/php.svg';
import postgresql from '../app/assets/svg/skills/postgresql.svg';
import python from '../app/assets/svg/skills/python.svg';
import typescript from '../app/assets/svg/skills/typescript.svg';

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  
  switch (skillID) {
    // Frontend
    case 'html':
      return html;
    case 'css':
      return css;
    case 'javascript':
      return javascript;
    case 'typescript':
      return typescript;
    case 'angular':
      return angular;
    
    // Backend
    case 'php':
      return php;
    case 'python':
      return python;
    case 'django':
      return django;
    case 'laravel':
      return laravel;
    
    // DevOps / Infrastructure
    case 'docker':
      return docker;
    case 'kubernetes':
      return kubernetes;
    case 'linux':
      return linux;
    case 'nginx':
      return nginx;
    case 'aws':
      return aws;
    
    // Database
    case 'mysql':
      return mysql;
    case 'postgresql':
      return postgresql;
    
    // Version Control
    case 'git':
      return git;
    
    default:
      return null;
  }
}
