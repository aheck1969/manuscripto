<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable()->after('name');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('avatar')->nullable()->after('email');
            $table->string('preferred_language', 5)->default('en')->after('avatar');
            $table->string('timezone')->default('UTC')->after('preferred_language');
            $table->integer('writing_goal_daily')->default(1000)->after('timezone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name',
                'last_name',
                'avatar',
                'preferred_language',
                'timezone',
                'writing_goal_daily',
            ]);
        });
    }
};
