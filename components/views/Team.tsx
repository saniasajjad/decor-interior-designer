import React from 'react';
import { TeamMember, AppView } from '../../types';
import { TEAM_MEMBERS } from '../../constants';


const TeamMemberCard: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => (
    <div className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
        <img className="mx-auto h-32 w-32 rounded-full object-cover" src={member.imageUrl} alt={member.name} />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">{member.name}</h3>
        <p className="text-sm leading-6 text-teal-600 dark:text-teal-400">{member.title}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
    </div>
);

const Team: React.FC<{ setView: (view: AppView) => void }> = ({ setView }) => (
    <section id="team" className="py-16 md:py-24 bg-white dark:bg-gray-800 animate-fade-in">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Meet Our Creative Team</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    The passionate individuals dedicated to revolutionizing the world of interior design.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 max-w-5xl mx-auto">
                {TEAM_MEMBERS.map((member, index) => <TeamMemberCard key={member.name} member={member} index={index} />)}
            </div>
            <div className="text-center mt-16">
                 <button onClick={() => setView('ABOUT')} className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                    Learn more about our story &rarr;
                </button>
            </div>
        </div>
    </section>
);

export default Team;
