import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username-setup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './username-setup.component.html',
  styleUrl: './username-setup.component.css'
})
export class UsernameSetupComponent implements OnInit {
  userProfile: any;
  usernameForm: FormGroup;
  generatedUsername: string = '';

  constructor(private router: Router) {
    this.usernameForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_#@$]{6,20}$')
      ])
    });
  }

  ngOnInit() {
    const userStr = sessionStorage.getItem("loggedInUser");
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    this.userProfile = JSON.parse(userStr);
    this.generateUsername();
  }

  generateUsername() {
    // Arrays of components to build username from
    const adjectives = ['Cool', 'Swift', 'Bright', 'Quick', 'Clever', 'Epic', 'Super', 'Mega', 'Brave', 'Mighty', 'Noble', 'Royal', 'Wise', 'Agile', 'Bold', 'Daring', 'Elite', 'Fierce', 'Grand', 'Hardy', 'Iron', 'Jolly', 'Keen', 'Lively', 'Magic', 'Nimble', 'Prime', 'Rapid', 'Sharp', 'Tough', 'Ultra', 'Vital', 'Wild', 'Young', 'Zealous', 'Alpha', 'Beta', 'Cyber', 'Dark', 'Echo', 'Flash', 'Ghost', 'Hyper', 'Ice', 'Jade', 'Lunar', 'Metal', 'Neo', 'Omega', 'Pixel', 'Quantum', 'Retro', 'Solar', 'Thunder', 'Urban', 'Vapor', 'Wonder', 'Xenon', 'Yonder', 'Zen', 'Astro', 'Blitz', 'Cosmic', 'Delta', 'Energy', 'Fusion', 'Giga', 'Havoc', 'Inferno', 'Jet', 'Kinetic', 'Logic', 'Macro', 'Neon', 'Orbit', 'Plasma', 'Quasar', 'Radiant', 'Sonic', 'Techno', 'Unity', 'Vortex', 'Warp', 'Xeno', 'Yield', 'Zero', 'Apex', 'Burst', 'Chrome', 'Drift', 'Edge', 'Flux', 'Glitch', 'Hack', 'Impact', 'Jolt', 'Kraft', 'Light', 'Mach', 'Nova', 'Onyx', 'Pulse', 'Quest', 'Rush', 'Storm', 'Titan', 'Ultra', 'Void', 'Wave', 'Xray', 'Yang', 'Zeal'];
    const nouns = ['Hawk', 'Wolf', 'Eagle', 'Tiger', 'Ninja', 'Rider', 'Star', 'Hero', 'Dragon', 'Phoenix', 'Lion', 'Panther', 'Falcon', 'Warrior', 'Knight', 'Samurai', 'Ranger', 'Hunter', 'Scout', 'Pilot', 'Captain', 'Master', 'Legend', 'Champion', 'Guardian', 'Sentinel', 'Wizard', 'Mage', 'Sage', 'Oracle', 'Prophet', 'Seeker', 'Runner', 'Racer', 'Drifter', 'Striker', 'Fighter', 'Soldier', 'Commander', 'Chief', 'Leader', 'Pioneer', 'Explorer', 'Voyager', 'Traveler', 'Wanderer', 'Nomad', 'Ranger', 'Tracker', 'Scout', 'Agent', 'Spy', 'Shadow', 'Ghost', 'Phantom', 'Spirit', 'Specter', 'Wraith', 'Demon', 'Angel', 'Saint', 'Knight', 'Paladin', 'Crusader', 'Templar', 'Warrior', 'Berserker', 'Viking', 'Samurai', 'Ninja', 'Assassin', 'Rogue', 'Thief', 'Bandit', 'Pirate', 'Corsair', 'Mariner', 'Captain', 'Admiral', 'General', 'Marshal', 'Emperor', 'King', 'Prince', 'Duke', 'Lord', 'Baron', 'Knight', 'Squire', 'Page', 'Scholar', 'Sage', 'Master', 'Guru', 'Monk', 'Priest', 'Bishop', 'Cardinal', 'Pope', 'Saint', 'Angel', 'Demon', 'Devil', 'Titan', 'Giant', 'Colossus', 'Beast', 'Monster'];
    
    // Get random components
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    const specialChars = ['@', '$', '_'];
    const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomUpperCase = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    
    this.generatedUsername = `${randomUpperCase}${name}${randomChar}${randomNum}`;
    this.usernameForm.patchValue({ username: this.generatedUsername });
  }

  onSubmit() {
    if (this.usernameForm.valid) {
      const username = this.usernameForm.get('username')?.value;
      const updatedProfile = { ...this.userProfile, username };
      sessionStorage.setItem("loggedInUser", JSON.stringify(updatedProfile));
      this.router.navigate(['/home']);
    }
  }
}
