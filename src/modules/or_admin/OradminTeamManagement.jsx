import React from 'react'
import TeamLeadAssine from '../../components/TeamLeadAssine'
import TeamView from '../../components/TeamView'
import { MdSettingsSuggest } from 'react-icons/md'

function OradminTeamLeadAssine() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <MdSettingsSuggest size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Team Management
            </h1>
        </div>
        <p className="text-gray-500 ml-12">
            Configure team structures and monitor employee-lead assignments.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <section>
            <TeamLeadAssine />
        </section>

        <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#f8fafc] px-4 text-gray-400 font-bold tracking-widest">
                    Current Team Hierarchy
                </span>
            </div>
        </div>

        <section>
            <TeamView />
        </section>
      </div>
    </div>
  )
}

export default OradminTeamLeadAssine